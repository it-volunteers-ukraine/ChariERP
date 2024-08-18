export const getHtmlCode = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => `<div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2 style="color: #333;">Ваші дані для входу</h2>
    <p style="margin-bottom: 20px;">
    <strong>Email</strong>:
    <span style="font-weight: bold; color: #1a73e8; background-color: #f1f1f1; padding: 10px; border-radius: 5px;">${email}</span>
    </p>
    <p>
    <strong>Пароль</strong>:
    <span style="font-weight: bold; color: #333; background-color: #f1f1f1; padding: 10px; border-radius: 5px;">${password}</span>
    </p>
    </div>`;
