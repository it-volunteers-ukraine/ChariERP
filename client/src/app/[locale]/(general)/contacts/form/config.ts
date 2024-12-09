interface IEmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
  surname: string;
}

export const InitialValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
  surname: '',
};

export const emailData = (values: IEmailData) => ({
  subject: `Зворотній зв'язок для ${values.name} ${values.surname}`,
  to: 'Foxalina31@gmail.com',
  text: `Ім'я: ${values.name}\nПрізвище: ${values.surname}\nEmail: ${values.email}\nТелефон: ${values.phone}\nПовідомлення: ${values.message}`,
  html: `
    <h3>Зворотня Форма</h3>
    <table>
      <tr><td style="padding: 8px; border: 1px solid #000;">Ім'я:</td><td style="  border: 1px solid #000; padding-left: 8px;">${values.name}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #000;">Прізвище:</td><td style="  border: 1px solid #000; padding-left: 8px;">${values.surname}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #000;">Email:</td><td style="  border: 1px solid #000; padding-left: 8px;">${values.email}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #000;">Телефон:</td><td style="  border: 1px solid #000; padding-left: 8px;">${values.phone}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #000;">Повідомлення:</td><td style="max-width:500px; word-wrap: break-word; word-break: break-word;  border: 1px solid #000; padding: 8px;">${values.message}</td></tr>
    </table>
  `,
});
