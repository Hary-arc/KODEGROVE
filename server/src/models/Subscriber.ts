export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export const SubscriberDefaults = {
  name: '',
};
