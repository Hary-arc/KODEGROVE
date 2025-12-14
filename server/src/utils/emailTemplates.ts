/**
 * Email Templates for Subscriber System
 * Professional HTML and text email templates
 */

interface SubscriberData {
    email: string
    name?: string
    subscribedAt: string
    source?: string
    ipAddress?: string
}

/**
 * Welcome email template for new subscribers
 */
export function getWelcomeEmail(subscriber: SubscriberData, siteName: string = 'KodeGrove') {
    const displayName = subscriber.name || 'there'

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ${siteName}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Welcome to ${siteName}! 🎉</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                Hi ${displayName},
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                Thank you for subscribing to ${siteName}! We're thrilled to have you on board.
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                You'll be the first to know about:
              </p>
              <ul style="margin: 0 0 20px; padding-left: 20px; font-size: 16px; line-height: 1.8; color: #333333;">
                <li>Latest digital trends and insights</li>
                <li>Exclusive tips and best practices</li>
                <li>New services and offerings</li>
                <li>Special promotions and updates</li>
              </ul>
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #333333;">
                Stay tuned for amazing content coming your way!
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" style="margin: 0 auto;">
                <tr>
                  <td style="border-radius: 4px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <a href="${process.env.CORS_ORIGIN || 'https://kodegrove.com'}" 
                       style="display: inline-block; padding: 14px 30px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold;">
                      Visit Our Website
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #6c757d;">
                © ${new Date().getFullYear()} ${siteName}. All rights reserved.
              </p>
              <p style="margin: 0; font-size: 12px; color: #6c757d;">
                You're receiving this email because you subscribed to our newsletter.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

    const text = `
Hi ${displayName},

Thank you for subscribing to ${siteName}! We're thrilled to have you on board.

You'll be the first to know about:
- Latest digital trends and insights
- Exclusive tips and best practices
- New services and offerings
- Special promotions and updates

Stay tuned for amazing content coming your way!

Visit our website: ${process.env.CORS_ORIGIN || 'https://kodegrove.com'}

© ${new Date().getFullYear()} ${siteName}. All rights reserved.
You're receiving this email because you subscribed to our newsletter.
  `.trim()

    return { html, text }
}

/**
 * Company notification email template for new subscribers
 */
export function getCompanyNotificationEmail(
    subscriber: SubscriberData,
    siteName: string = 'KodeGrove'
) {
    const displayName = subscriber.name || 'Not provided'
    const source = subscriber.source || 'Unknown'
    const ipAddress = subscriber.ipAddress || 'Not captured'
    const formattedDate = new Date(subscriber.subscribedAt).toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
    })

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Subscriber Alert</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 30px; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🎊 New Subscriber!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #333333;">
                Great news! You have a new subscriber to ${siteName}.
              </p>
              
              <!-- Subscriber Details Card -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px; overflow: hidden; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="margin: 0 0 20px; font-size: 18px; color: #333333; border-bottom: 2px solid #11998e; padding-bottom: 10px;">
                      Subscriber Details
                    </h2>
                    
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6c757d; width: 140px; vertical-align: top;">
                          <strong>Email:</strong>
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                          <a href="mailto:${subscriber.email}" style="color: #11998e; text-decoration: none;">
                            ${subscriber.email}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6c757d; vertical-align: top;">
                          <strong>Name:</strong>
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                          ${displayName}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6c757d; vertical-align: top;">
                          <strong>Subscribed At:</strong>
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                          ${formattedDate}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6c757d; vertical-align: top;">
                          <strong>Source:</strong>
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                          ${source}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6c757d; vertical-align: top;">
                          <strong>IP Address:</strong>
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #333333;">
                          ${ipAddress}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #6c757d; font-style: italic;">
                This is an automated notification from your ${siteName} subscriber system.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; font-size: 14px; color: #6c757d;">
                © ${new Date().getFullYear()} ${siteName}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

    const text = `
🎊 NEW SUBSCRIBER ALERT

Great news! You have a new subscriber to ${siteName}.

SUBSCRIBER DETAILS:
-------------------
Email: ${subscriber.email}
Name: ${displayName}
Subscribed At: ${formattedDate}
Source: ${source}
IP Address: ${ipAddress}

This is an automated notification from your ${siteName} subscriber system.

© ${new Date().getFullYear()} ${siteName}. All rights reserved.
  `.trim()

    return { html, text }
}

export default {
    getWelcomeEmail,
    getCompanyNotificationEmail,
}
