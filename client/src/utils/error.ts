import { FieldMetaProps } from 'formik';

export const controlError = <T>(meta: FieldMetaProps<T>, name: string, label?: string) => {
  const error = meta && meta.touched && meta.error;

  if (!error) return undefined;

  return error.replace(name, label || 'Value');
};
