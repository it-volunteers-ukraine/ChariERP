'use client';

import { useEffect, useState } from 'react';
import { FormikValues } from 'formik';
import { useParams } from 'next/navigation';

import { UserStatus } from '@/types';
import { useLoaderAdminPage } from '@/context';

import { IEditData } from '../../types';
import { EmployeeForm } from '../../employee-form';

const object = {
  avatarUrl: '',
  address: 'UK',
  firstName: 'Павлик',
  position: 'менеджер',
  lastName: 'Павлюченко',
  middleName: 'Павлович',
  lastLogin: '2024-09-16',
  email: 'denys@gmail.com',
  notes: 'srdtfyguhjiokpl',
  status: UserStatus.ACTIVE,
  phone: '+38 (095) 377 77 77',
  dateOfBirth: '2024-09-19T13:07:47.271Z',
  dateOfEntry: '2024-09-19T13:07:47.271Z',
};

const employeeEditInitialValues = (data?: IEditData) => ({
  email: data?.email ?? '',
  notes: data?.notes ?? '',
  phone: data?.phone ?? '',
  address: data?.address ?? '',
  lastName: data?.lastName ?? '',
  position: data?.position ?? '',
  avatarUrl: data?.avatarUrl ?? '',
  lastLogin: data?.lastLogin ?? '',
  firstName: data?.firstName ?? '',
  middleName: data?.middleName ?? '',
  dateOfBirth: data?.dateOfBirth ?? '',
  dateOfEntry: data?.dateOfEntry ?? '',
  status: data?.status ?? UserStatus.ACTIVE,
});

const EmployeeId = () => {
  const { id } = useParams();
  const { setIsLoading } = useLoaderAdminPage();
  const [data, setData] = useState<IEditData>();

  const onSubmit = (values: FormikValues) => {
    console.log(values);
  };

  const loadData = async () => {
    setIsLoading(true);

    try {
      setData(object);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 1000);
  }, [id]);

  return <EmployeeForm onSubmit={onSubmit} initialValues={employeeEditInitialValues(data)} />;
};

export default EmployeeId;
