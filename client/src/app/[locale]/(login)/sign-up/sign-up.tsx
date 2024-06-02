'use client';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { Button, FileField, InputField } from '@/components';

import { initialValues, validationSchema } from './config';
import { getStyles } from './styles';

const SignUp = () => {
  const styles = getStyles();

  const registration = useTranslations('auth-page.registration');

  const onSubmit = (values: FormikValues) => {
    console.log(values);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {() => (
        <Form className="flex flex-col items-center w-full">
          <div className={styles.inputWrapper}>
            <FileField
              name="file"
              infoLinkRout="#"
              infoLinkText=" Як завантажити файл."
              label="Довідка про внесення в реєстр"
              info=" Для завантаження документу натисніть на іконку скрепки або на
              поле “Завантажити файл”.Формат jpg, jpeg, png або pdf.
              Максимальний розмір 5 МБ."
            />
          </div>

          <div className={styles.inputWrapper}>
            <InputField
              required
              name="email"
              info="Українською мовою (відповідно до Статуту)"
              infoAddl="Наприклад: Громадська організація «ЖИВИ»"
              label="Електронна скринька представника (e-mail)"
            />
          </div>

          <div className={styles.inputWrapper}>
            <div className="laptop:w-[49%]">
              <InputField
                required
                name="text"
                label="Електронна скринька представника (e-mail)"
              />
            </div>
          </div>

          <Button
            type="submit"
            styleType="primary"
            className="uppercase"
            text={registration('button')}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
