'use client';

import { useState } from 'react';
import { FormikValues } from 'formik';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';
import { ICreateUser } from '@/types';
import { useUserInfo } from '@/context';
import { createUserSerializer } from '@/utils';
import { createUserByCompanyIdAction } from '@/actions';
import { employeeCreateInitialValues, showMessage } from '@/components';

import { EmployeeForm } from '../employee-form';
import { useTranslations } from 'next-intl';

const CreatePage = () => {
  const addUserError = useTranslations('errors.employees');
  const addUserSuccess = useTranslations('success.employees');
  const { organizationId } = useUserInfo();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: FormikValues) => {
    const formData = new FormData();
    const { avatarUrl, organizationId: id, data } = createUserSerializer({ ...values, organizationId } as ICreateUser);

    formData.append('avatarUrl', avatarUrl);
    formData.append('organizationId', `${id}`);
    formData.append('data', JSON.stringify(data));

    try {
      setIsLoading(true);
      const resp = await createUserByCompanyIdAction(formData);

      if (resp.success) {
        showMessage.success(addUserSuccess('addUser'));
        router.push(routes.employees);
      }

      if (!resp.success) {
        showMessage.error(addUserError('addUser'));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EmployeeForm onSubmit={onSubmit} isCreate initialValues={employeeCreateInitialValues} isLoading={isLoading} />
  );
};

export { CreatePage };
