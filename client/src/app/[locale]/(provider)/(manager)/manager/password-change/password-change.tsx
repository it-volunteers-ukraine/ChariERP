'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Form, Formik, FormikHelpers } from 'formik';

import { routes } from '@/constants';
import { Button, InputField, Title } from '@/components';

import { getValidationSchema, initialValues } from './config';

const PasswordChange = () => {
  const router = useRouter();
  const btn = useTranslations('button');
  const message = useTranslations('validation');
  const errorText = useTranslations('errors.login');
  const passwordChangeText = useTranslations('password-change');

  const validationSchema = getValidationSchema(message);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCancel = () => {
    //TODO select a route
    router.push(routes.employees);
  };

  const onSubmit = async (
    values: { newPassword: string; passwordConfirmation: string },
    formikHelpers?: FormikHelpers<{ newPassword: string; passwordConfirmation: string }>,
  ) => {
    setIsLoading(true);

    try {
      //TODO create fetch
      await axios.post('', {
        newPassword: values.newPassword,
        passwordConfirmation: values.passwordConfirmation,
      });
      //TODO set cookies
      // Cookies.set('id', data._id, { expires: 7 });
      //router.push(routes);
    } catch (error) {
      if (error instanceof AxiosError) {
        formikHelpers?.setFieldError(
          'password',
          error.response?.data.message && errorText(error.response.data.message),
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-bgAuthGradient h-screen pt-16 shadow-passwordChange flex justify-center px-4 tablet:px-0">
      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        {() => (
          <Form className="shadow-auth h-min rounded-lg max-w-[611px] w-full pt-[44px] px-[20px] tablet:px-[56px] pb-[32px] tablet:pb-[48px]">
            <Title
              title={passwordChangeText('title')}
              className="font-scada uppercase text-[20px] mb-8 !text-midGray text-center leading-6"
            />

            <div className="flex flex-col gap-6">
              <InputField required name="newPassword" type="password" label={passwordChangeText('newPassword')} />
              <InputField
                required
                type="password"
                name="passwordConfirmation"
                label={passwordChangeText('passwordConfirmation')}
              />
            </div>

            <div className="flex justify-center mt-10 gap-6">
              <Button
                type="submit"
                styleType="green"
                text={btn('accept')}
                isLoading={isLoading}
                className=" uppercase"
              />

              <Button
                styleType="red"
                text={btn('decline')}
                className="uppercase"
                isLoading={isLoading}
                onClick={() => {
                  handleCancel();
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export { PasswordChange };
