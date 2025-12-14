# Subscriber System

## Overview

The subscriber system allows users to sign up for newsletters and updates via the homepage CTA section. When a user subscribes:

1. **Subscriber data is stored** in `server/data/storage/subscribers.json`
2. **Welcome email is sent** to the subscriber
3. **Company notification email is sent** to the configured company email address

## Features

- ✅ Email validation and duplicate prevention
- ✅ Professional HTML email templates
- ✅ Company notifications for new subscribers
- ✅ IP address tracking for analytics
- ✅ Source tracking (e.g., homepage_cta)
- ✅ Subscriber status management (active/unsubscribed)
- ✅ Graceful error handling (emails are fire-and-forget)

## API Endpoints

### Create Subscriber
```
POST /api/subscribers
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe" (optional)
}
```

**Response (201 Created)**:
```json
{
  "success": true,
  "message": "Successfully subscribed",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2025-12-13T03:00:00.000Z",
    "subscribedAt": "2025-12-13T03:00:00.000Z",
    "source": "homepage_cta",
    "status": "active",
    "ipAddress": "192.168.1.1"
  }
}
```

### List Subscribers
```
GET /api/subscribers
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": [...],
  "count": 10
}
```

## Configuration

### Environment Variables

Add these to your `.env` file:

```env
# SMTP Configuration
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your_ethereal_user
SMTP_PASS=your_ethereal_pass
EMAIL_FROM="KodeGrove <no-reply@kodegrove.local>"
SITE_NAME=KodeGrove

# Company Notifications
COMPANY_EMAIL=admin@kodegrove.com
COMPANY_NAME=KodeGrove Team
```

### Getting SMTP Credentials

For development, use [Ethereal Email](https://ethereal.email/):
1. Visit https://ethereal.email/
2. Click "Create Ethereal Account"
3. Copy the SMTP credentials to your `.env` file
4. View sent emails at https://ethereal.email/messages

For production, use a real SMTP provider like:
- SendGrid
- Mailgun
- Amazon SES
- Gmail SMTP

## Email Templates

The system uses professional HTML email templates located in `server/src/utils/emailTemplates.ts`:

### Welcome Email
- Sent to new subscribers
- Includes welcome message and site information
- Responsive HTML design with fallback text version

### Company Notification Email
- Sent to company email address
- Includes subscriber details:
  - Email address
  - Name
  - Subscription timestamp
  - Source
  - IP address
- Professional card-based design

## Data Storage

Subscribers are stored in `server/data/storage/subscribers.json` with the following structure:

```json
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2025-12-13T03:00:00.000Z",
    "subscribedAt": "2025-12-13T03:00:00.000Z",
    "source": "homepage_cta",
    "status": "active",
    "ipAddress": "192.168.1.1"
  }
]
```

## Testing

### Test Subscriber Creation

```bash
curl -X POST http://localhost:5001/api/subscribers \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

### Test Duplicate Prevention

```bash
# Submit the same email twice
curl -X POST http://localhost:5001/api/subscribers \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

Expected response: `"message": "Already subscribed"`

### Test Email Validation

```bash
curl -X POST http://localhost:5001/api/subscribers \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid-email"}'
```

Expected response: `"message": "Invalid email format"`

## Troubleshooting

### Emails not sending

If SMTP is not configured, emails will be logged to the console instead:
```
SendEmail: nodemailer not available or SMTP not configured. Logging email instead.
```

This is normal for development. Configure SMTP credentials to actually send emails.

### Company notifications not sending

Check that `COMPANY_EMAIL` is set in your `.env` file. If not configured, you'll see:
```
⚠️ COMPANY_EMAIL not configured. Skipping company notification.
```

### Database file not found

The `subscribers.json` file is created automatically when the first subscriber is added. If you want to manually create it:

```bash
mkdir -p server/data/storage
echo "[]" > server/data/storage/subscribers.json
```

## Frontend Integration

The frontend CTA section (`client/src/components/home-sections/CtaSection.tsx`) is already configured to use the subscriber API. No changes needed!

## Security Notes

- Email addresses are normalized (lowercase, trimmed)
- Email format is validated with regex
- Duplicate subscriptions return success (prevents email enumeration)
- IP addresses are captured for analytics (optional, can be disabled)
- Email sending is fire-and-forget (doesn't block API responses)
- All errors are logged but don't fail the API request
