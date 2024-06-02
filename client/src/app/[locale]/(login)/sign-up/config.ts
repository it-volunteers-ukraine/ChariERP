import * as Yup from 'yup';

export const initialValues = {
  email: '',
};

export const validationSchema = () =>
  Yup.object().shape({
    email: Yup.string().trim().min(6).max(50).email().required(),
  });
