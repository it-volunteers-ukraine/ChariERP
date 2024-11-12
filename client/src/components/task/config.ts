import * as Yup from 'yup';

export const getValidationSchema = () =>
  Yup.object().shape({
    title: Yup.string().max(130, 'Максимальна кількість символів - 130').required(`Це поле обов'язкове для заповнення`),
  });
