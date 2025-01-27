'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Form, Formik, FormikHelpers } from 'formik';

import { routes } from '@/constants';
import { changePasswordAction } from '@/actions';
import { Button, InputField, showMessage, Title } from '@/components';

import { getValidationSchema, initialValues } from './config';

interface IValues {
  newPassword: string;
  passwordConfirmation: string;
}

const PasswordChange = () => {
  const router = useRouter();
  const btn = useTranslations('button');
  const message = useTranslations('validation');
  const errorText = useTranslations('errors.login');
  const passwordChangeText = useTranslations('password-change');

  const validationSchema = getValidationSchema(message);

  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryToken = new URLSearchParams(window.location.search).get('token');

      setToken(queryToken);
    }
  }, []);

  const handleCancel = () => {
    router.push(routes.home);
  };

  const onSubmit = async (values: IValues, formikHelpers?: FormikHelpers<IValues>) => {
    setIsLoading(true);

    try {
      const response = await changePasswordAction(token, values.passwordConfirmation);

      if (response.success) {
        showMessage.success(passwordChangeText('successChange'));
      } else {
        showMessage.error(passwordChangeText(response.message));
      }
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const responseMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message;

        formikHelpers?.setFieldError(
          'password',
          responseMessage ? errorText(responseMessage) : 'Unexpected error occurred.',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex h-full justify-center bg-bgAuthGradient px-4 py-16 shadow-passwordChange tablet:px-0">
      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        {() => (
          <Form className="h-min w-full max-w-[611px] rounded-lg px-[20px] pb-[32px] pt-[44px] shadow-auth tablet:px-[56px] tablet:pb-[48px]">
            <Title
              title={passwordChangeText('title')}
              className="mb-8 text-center font-scada text-[20px] uppercase leading-6 !text-midGray"
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

            <div className="mt-10 flex justify-center gap-6">
              <Button
                type="submit"
                styleType="green"
                text={btn('accept')}
                isLoading={isLoading}
                className="uppercase"
              />

              <Button
                type="button"
                styleType="red"
                className="uppercase"
                text={btn('decline')}
                onClick={handleCancel}
              />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export { PasswordChange };
