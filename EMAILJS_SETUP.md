# EmailJS Setup Guide

This guide will help you set up EmailJS to enable email sending functionality in the contact form.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)

## Step 2: Create an Email Service

1. After logging in, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Copy the **Service ID** (you'll need this later)

## Step 3: Create an Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Set up your template with the following variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message
   - `{{to_email}}` - Recipient email (optional, can be set in template)

4. Example template:
   ```
   From: {{from_name}} <{{from_email}}>
   Subject: {{subject}}
   
   Message:
   {{message}}
   ```

5. Copy the **Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **Account** > **General**
2. Find your **Public Key** in the API Keys section
3. Copy the **Public Key**

## Step 5: Configure Environment Variables

1. Create a `.env.local` file in the root directory (haven-tech folder)
2. Add the following variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual EmailJS credentials

## Step 6: Restart Development Server

After adding the environment variables, restart your development server:

```bash
npm run dev
```

## Fallback Behavior

If EmailJS is not configured, the contact form will automatically fall back to opening the user's default email client with a pre-filled mailto link. This ensures the form always works, even without EmailJS setup.

## Testing

1. Fill out the contact form
2. Click "Send Message"
3. Check your email inbox for the message
4. If using EmailJS, you should receive the email directly
5. If using fallback, your email client should open with the pre-filled message

## Troubleshooting

- **Email not sending**: Check that all environment variables are set correctly
- **Template variables not working**: Ensure variable names match exactly (case-sensitive)
- **Service not found**: Verify your Service ID is correct
- **Rate limit exceeded**: Free tier allows 200 emails/month, upgrade if needed

## Security Note

Never commit your `.env.local` file to version control. It's already in `.gitignore` by default.

