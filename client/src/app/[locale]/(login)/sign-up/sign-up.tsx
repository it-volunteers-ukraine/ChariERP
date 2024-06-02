'use client';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { Button, FileField, InputField } from '@/components';

import { initialValues, validationSchema } from './config';
import { getStyles } from './styles';
import Link from 'next/link';

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
            <FileField name="file" label="Довідка про внесення в реєстр" />

            <div className={`${styles.inputTextWrapper} laptop:h-[50px]`}>
              <div className="leading-4 tablet:leading-5">
                <span className={styles.inputText}>
                  Для завантаження документу натисніть на іконку скрепки або на
                  поле “Завантажити файл”.Формат jpg, jpeg, png або pdf.
                  Максимальний розмір 5 МБ.
                </span>

                <Link
                  href="#"
                  className={`${styles.inputText} ml-[3px] italic font-medium text-input-link underline decoration-input-link`}
                >
                  Як завантажити файл.
                </Link>
              </div>
            </div>
          </div>

          <div className={`${styles.inputWrapper}`}>
            <InputField
              required
              name="email"
              label="Електронна скринька представника (e-mail)"
            />

            <div className={`${styles.inputTextWrapper}`}>
              <div className="leading-4 tablet:leading-5">
                <span className={styles.inputText}>
                  Українською мовою (відповідно до Статуту)
                </span>

                <span
                  className={`${styles.inputText} ml-[3px] italic font-medium`}
                >
                  Наприклад: Громадська організація «ЖИВИ»
                </span>
              </div>
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
