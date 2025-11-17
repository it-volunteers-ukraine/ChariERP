'use client';

import { useState } from 'react';
import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import logger from '@/utils/logger/logger';

import { routes } from '@/constants';
import { clearUserCookies } from '@/utils';
import { changePasswordAction } from '@/actions';
import { Button, InputField, showMessage, Title } from '@/components';

import { getValidationSchema, initialValues } from './config';

interface IValues {
  newPassword: string;
  passwordConfirmation: string;
}

const PasswordChange = () => {
  const router = useRouter();

  const token = useSearchParams().get('token');

  const btn = useTranslations('button');
  const message = useTranslations('validation');
  const passwordChangeText = useTranslations('password-change');

  const validationSchema = getValidationSchema(message);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCancel = () => {
    router.push(routes.home);
  };

  const onSubmit = async (values: IValues) => {
    setIsLoading(true);

    try {
      const response = await changePasswordAction(token, values.passwordConfirmation);

      if (response.success) {
        showMessage.success(passwordChangeText('successChange'));
        clearUserCookies();
        router.push(routes.login);
      } else {
        showMessage.error(passwordChangeText(response.message));
      }
    } catch (error) {
      logger.error(error);

      showMessage.error(passwordChangeText('error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-bg-auth-gradient shadow-password-change tablet:px-0 flex h-full justify-center px-4 py-16">
      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        {() => (
          <Form className="shadow-auth tablet:px-[56px] tablet:pb-[48px] h-min w-full max-w-[611px] rounded-lg px-[20px] pt-[44px] pb-[32px]">
            <Title
              title={passwordChangeText('title')}
              className="font-scada text-mid-gray! mb-8 text-center text-[20px] leading-6 uppercase"
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
