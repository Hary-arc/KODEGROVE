# Subscriber API & Email Pipeline

Setup steps:

1. Install dependencies (from `server` folder):

   npm install

2. Create a `.env` file (you can copy `.env.example`) and set SMTP credentials.

3. Start the server:

   npm run dev

4. Test the endpoint (example with curl):

   curl -X POST http://localhost:5001/api/subscribers -H "Content-Type: application/json" -d '{"email":"you@example.com","name":"Your Name"}'

Ethereal (for development):

- You can create a test account at https://ethereal.email/ to get SMTP credentials.

Notes:

- The subscriber data is stored in `data/storage/subscribers.json` using the simple DataStore.
- Email sending uses Nodemailer and respects `SMTP_*` env vars.
