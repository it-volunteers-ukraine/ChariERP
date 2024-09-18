'use client';

import { FormikValues } from 'formik';

import { employeeCreateInitialValues } from '@/components';

import { EmployeeForm } from '../employee-form';

const Create = () => {
  const onSubmit = (values: FormikValues) => {
    console.log(values);
  };

  return <EmployeeForm onSubmit={onSubmit} isCreate initialValues={employeeCreateInitialValues} />;
};

export default Create;
