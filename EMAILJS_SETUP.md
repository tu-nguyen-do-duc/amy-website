# EmailJS Configuration Guide

## To set up the contact form, follow these steps:

1. **Create an EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account

2. **Get Your Public Key**
   - In the EmailJS dashboard, go to Account > API Keys
   - Copy your Public Key

3. **Create an Email Service**
   - In the dashboard, go to Email Services
   - Click "Create New Service"
   - Choose a provider (Gmail, Outlook, or direct SMTP)
   - Complete the service setup and save the Service ID

4. **Create an Email Template**
   - In the dashboard, go to Email Templates
   - Click "Create New Template"
   - Use the following template variables:
     - {{to_email}} = nguyendoductu@gmail.com
     - {{from_name}}
     - {{from_email}}
     - {{subject}}
     - {{message}}
   - Save and note the Template ID

5. **Add Environment Variables**
   - Create a `.env.local` file in the project root:
     ```
     REACT_APP_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
     REACT_APP_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID
     REACT_APP_EMAILJS_TEMPLATE_ID=YOUR_TEMPLATE_ID
     ```
   - Replace the values with your actual IDs

6. **Update Home.tsx**
   - The code is already set up, just make sure to use your IDs in the environment variables

7. **Restart the development server**
   ```
   npm start
   ```

## Alternative (Simpler Setup)
If you want a quicker setup without EmailJS, you can use FormSubmit (formsubmit.co):
- Just update the form to POST to their endpoint
- No backend required
- Works immediately
