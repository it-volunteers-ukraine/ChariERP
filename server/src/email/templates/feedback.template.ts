import { IFeedback } from '@/feedback/interfaces/feedback.interface';

export function generateFeedbackEmailTemplate(feedback: IFeedback): string {
  return `
    <div style="display: none; font-size: 1px; color: #ffffff; line-height: 1px; max-height: 0; max-width: 0; 
    opacity: 0; overflow: hidden;">
      You've received a new message from ChariERP website feedback form. ${'&zwnj;'.repeat(500)}
    </div>
    <table border="1" cellpadding="5" cellspacing="0">
      <tr><td><b>Прізвище</b></td><td>${feedback.lastname}</td></tr>
      <tr><td><b>Ім'я</b></td><td>${feedback.firstname}</td></tr>
      <tr><td><b>Електронна скринька (e-mail)</b></td><td>${feedback.email}</td></tr>
      <tr><td><b>Телефон (з кодом міста)</b></td><td>${feedback.phone}</td></tr>
      <tr><td><b>Повідомлення</b></td><td>${feedback.message.replace(/\n/g, '<br>')}</td></tr>
    </table>
  `;
}
