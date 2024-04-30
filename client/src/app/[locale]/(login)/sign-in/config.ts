import * as Yup from 'yup';

export const initialValues = {
  email: '',
  password: '',
};

export const validationSchema = Yup.object().shape({
  email: Yup.string().trim().min(6).max(50).email().required(),
  password: Yup.string()
    .trim()
    .min(8)
    .max(20)
    .matches(
      /^[^\u0400-\u04FF]+$/,
      'Пароль не должен содержать кириллические символы',
    )
    .required(),
});
