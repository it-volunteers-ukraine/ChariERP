'use client';

import { useState } from 'react';

import { TaskPageParamsProps } from '@/types';

import { Task } from '..';

export const EditTask = ({ params }: TaskPageParamsProps) => {
  const [title, setTitle] = useState(
    'Назва для таски Назва для таски Назва для таски Назва для таски Назва для таски Назва для таски  Назва для таски Назва для таски нНазва для таски Назва для таски Назва для таски Назва для таски Назва для таски Назва для таски  Назва для таски Назва для таски н',
  );

  const onSubmit = async () => {
    console.log({ title: title });
    console.log({ params });
  };

  return <Task title={title} setTitle={setTitle} onSubmit={onSubmit} />;
};
