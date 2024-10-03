'use client';

import { useEffect, useState } from 'react';
import { FormikValues } from 'formik';
import { useParams, useRouter } from 'next/navigation';

import { IEditUser } from '@/types';
import { routes } from '@/constants';
import { showMessage } from '@/components';
import { updateUserSerializer } from '@/utils';
import { useLoaderAdminPage, useUserInfo } from '@/context';
import { getMemberByIdAction, updateMemberByIdAction } from '@/actions';

import { EmployeeForm } from '../../employee-form';
import { employeeEditInitialValues } from './config';

const EmployeeId = () => {
  const router = useRouter();
  const { id } = useParams();
  const { organizationId } = useUserInfo();
  const { setIsLoading } = useLoaderAdminPage();
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [data, setData] = useState<IEditUser>();

  const onSubmit = async (values: FormikValues) => {
    const formData = new FormData();
    const { avatarUrl, data } = updateUserSerializer(values as IEditUser);

    formData.append('avatarUrl', avatarUrl);
    formData.append('data', JSON.stringify(data));
    formData.append('id', String(id));

    try {
      setIsLoadingUpdate(true);

      const response = await updateMemberByIdAction(formData);

      console.log({ response });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingUpdate(false);
    }
    console.log(values);
  };

  const loadData = async () => {
    setIsLoading(true);

    try {
      const response = await getMemberByIdAction(String(id), String(organizationId));

      if (!response.success && response.message) {
        showMessage.error(response.message);
        router.push(routes.employees);

        return;
      }

      setData(JSON.parse(response.user as string));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <EmployeeForm onSubmit={onSubmit} initialValues={employeeEditInitialValues(data)} isLoading={isLoadingUpdate} />
  );
};

export default EmployeeId;