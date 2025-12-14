export interface Subscriber {
  id: string
  email: string
  name?: string
  createdAt: string
  subscribedAt: string
  source?: string
  status: 'active' | 'unsubscribed'
  ipAddress?: string
}

export const SubscriberDefaults = {
  name: '',
  source: 'website',
  status: 'active' as const,
}
