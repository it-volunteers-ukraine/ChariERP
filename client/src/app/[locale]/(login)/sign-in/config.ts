import * as Yup from 'yup';

interface IConfig {
  required: string;
  matches: string;
  min6: string;
  min8: string;
  max20: string;
  max50: string;
}

export const initialValues = {
  email: '',
  password: '',
};

export const getValidationSchema = ({ min6, min8, max20, max50, matches, required }: IConfig) =>
  Yup.object().shape({
    email: Yup.string().trim().min(6, min6).max(50, max50).email().required(required),
    password: Yup.string()
      .trim()
      .min(8, min8)
      .max(20, max20)
      .matches(/^[^\u0400-\u04FF]+$/, matches)
      .required(required),
  });
