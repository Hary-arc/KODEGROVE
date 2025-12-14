import { Request, Response } from 'express'
import { DataStore } from '../utils/dataStore.js'
import { Subscriber } from '../models/Subscriber.js'
import Core from '../integrations/Core.js'
import { getWelcomeEmail, getCompanyNotificationEmail } from '../utils/emailTemplates.js'

const store = new DataStore<Subscriber>('subscribers')

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Get client IP address from request
 */
function getClientIP(req: Request): string | undefined {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim()
  }
  return req.socket.remoteAddress
}

/**
 * Send company notification email about new subscriber
 */
async function sendCompanyNotification(subscriber: Subscriber): Promise<void> {
  const companyEmail = process.env.COMPANY_EMAIL
  const siteName = process.env.SITE_NAME || 'KodeGrove'
  const companyName = process.env.COMPANY_NAME || 'KodeGrove Team'

  if (!companyEmail) {
    console.warn('⚠️ COMPANY_EMAIL not configured. Skipping company notification.')
    return
  }

  try {
    const { html, text } = getCompanyNotificationEmail(subscriber, siteName)

    await Core.SendEmail({
      to: companyEmail,
      subject: `🎊 New Subscriber: ${subscriber.email}`,
      html,
      text,
    })

    console.log(`✅ Company notification sent to ${companyEmail}`)
  } catch (error) {
    console.error('❌ Failed to send company notification:', error)
    // Don't throw - we don't want to fail the API request if notification fails
  }
}

/**
 * Create a new subscriber
 */
export async function createSubscriber(req: Request, res: Response) {
  try {
    const { email, name } = req.body

    // Validate email
    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      })
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check for existing subscriber
    const existing = await store.findOne(s => s.email.toLowerCase() === normalizedEmail)
    if (existing) {
      return res.status(200).json({
        success: true,
        message: 'Already subscribed',
        data: existing
      })
    }

    // Get client IP address
    const ipAddress = getClientIP(req)

    // Create new subscriber
    const now = new Date().toISOString()
    const newSubscriber = await store.create({
      email: normalizedEmail,
      name: name?.trim() || '',
      createdAt: now,
      subscribedAt: now,
      source: 'homepage_cta',
      status: 'active',
      ipAddress,
    })

    console.log(`📧 New subscriber: ${newSubscriber.email}`)

    // Send welcome email to subscriber (fire-and-forget)
    const siteName = process.env.SITE_NAME || 'KodeGrove'
    const { html: welcomeHtml, text: welcomeText } = getWelcomeEmail(newSubscriber, siteName)

    Core.SendEmail({
      to: newSubscriber.email,
      subject: `Welcome to ${siteName}! 🎉`,
      html: welcomeHtml,
      text: welcomeText,
    }).catch(err => {
      console.error('❌ Failed to send welcome email:', err)
    })

    // Send company notification email (fire-and-forget)
    sendCompanyNotification(newSubscriber).catch(err => {
      console.error('❌ Failed to send company notification:', err)
    })

    return res.status(201).json({
      success: true,
      message: 'Successfully subscribed',
      data: newSubscriber
    })
  } catch (err) {
    console.error('❌ createSubscriber error:', err)
    return res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

/**
 * List all subscribers
 */
export async function listSubscribers(req: Request, res: Response) {
  try {
    const items = await store.findAll()
    res.json({ success: true, data: items, count: items.length })
  } catch (err) {
    console.error('❌ listSubscribers error:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
