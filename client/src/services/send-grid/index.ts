'use server';

import sgMail from '@sendgrid/mail';

const apiKey = process.env.SEND_GRID_API_KEY;
const emailFrom = process.env.EMAIL_FROM;

sgMail.setApiKey(apiKey!);

interface ISendEmailProps {
  to: string;
  text: string;
  html: string;
  subject: string;
}

export const sendEmail = async ({ to, subject, text, html }: ISendEmailProps) => {
  const message = {
    to: to,
    text: text,
    html: html,
    subject: subject,
    from: { name: 'Chari ERP', email: emailFrom! },
  };

  try {
    await sgMail.send(message);
  } catch (error) {
    return Promise.reject(error);
  }
};
