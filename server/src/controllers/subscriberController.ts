import { Request, Response } from 'express';
import { DataStore } from '../utils/dataStore.js';
import { Subscriber } from '../models/Subscriber.js';
import Core from '../integrations/Core.js';

const store = new DataStore<Subscriber>('subscribers');

export async function createSubscriber(req: Request, res: Response) {
  try {
    const { email, name } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ success: false, message: 'Valid email is required' });
    }

    // Check for existing
    const existing = await store.findOne(s => s.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(200).json({ success: true, message: 'Already subscribed' });
    }

    const newSub = await store.create({
      email: email.toLowerCase(),
      name: name || '',
      createdAt: new Date().toISOString(),
    });

    // Send welcome email (fire-and-forget but handle errors)
    Core.SendEmail({
      to: newSub.email,
      subject: `Welcome to ${process.env.SITE_NAME || 'our site'}`,
      html: `<p>Hi ${newSub.name || ''},</p><p>Thanks for subscribing to ${process.env.SITE_NAME || 'our updates'}! We'll keep you posted.</p>`,
      text: `Hi ${newSub.name || ''},\nThanks for subscribing to ${process.env.SITE_NAME || 'our updates'}!`,
    }).catch(err => {
      console.error('Failed to send welcome email:', err);
    });

    return res.status(201).json({ success: true, data: newSub });
  } catch (err) {
    console.error('createSubscriber error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export async function listSubscribers(req: Request, res: Response) {
  try {
    const items = await store.findAll();
    res.json({ success: true, data: items });
  } catch (err) {
    console.error('listSubscribers error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
