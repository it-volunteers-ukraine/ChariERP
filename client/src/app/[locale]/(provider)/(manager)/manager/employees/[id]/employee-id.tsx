/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { useLoaderAdminPage } from '@/context';
import { employeeCreateInitialValues } from '@/components';

import { IEmployeeData } from '../types';
import { EmployeeForm } from '../employee-form';
import { UserStatus } from '@/types';

const object = {
  avatarUrl: '',
  address: 'UK',
  firstName: 'Павлик',
  password: 'Asdf1234',
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

const EmployeeId = () => {
  const { id } = useParams();
  const { setIsLoading } = useLoaderAdminPage();
  const [data, setData] = useState<IEmployeeData>();

  const onSubmit = () => {};

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
    loadData();
  }, [id]);

  return <EmployeeForm onSubmit={onSubmit} initialValues={employeeCreateInitialValues} data={data} />;
};

export default EmployeeId;
