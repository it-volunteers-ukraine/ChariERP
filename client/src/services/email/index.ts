'use server';

import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.EMAIL_FROM;

const resend = new Resend(apiKey);

interface ISendEmailProps {
  to: string;
  text: string;
  html: string;
  subject: string;
}

export const sendEmail = async ({ to, subject, text, html }: ISendEmailProps) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `Chari ERP <${emailFrom!}>`,
      to: [to],
      subject: subject,
      text: text,
      html: html,
    });

    if (error) {
      return Promise.reject(new Error(`Resend API error: ${error.message || 'Unknown error'}`));
    }

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
