'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';

import { routes } from '@/constants';
import { useUserInfo } from '@/context';
import { TaskPageParamsProps } from '@/types';

import { Task } from '..';
import { useAddTask } from '../api/use-add';

const task = {
  status: 'in_progress',
  priority: 'high',
  attachment: [],
  comments: [],
  date_end: new Date(),
  date_start: new Date(),
  description: 'Task description',
};

export const NewTask = async ({ params }: TaskPageParamsProps) => {
  const { isManager, _id } = useUserInfo();

  const [title, setTitle] = useState('');

  const id = _id ? String(_id) : undefined;
  const { board_id, column_id } = await params

  const { addTask } = useAddTask({ userId: id!, boardId: board_id, columnId: column_id });

  const onSubmit = async () => {
    await addTask({ ...task, title });
  };

  return (
    <>
      {isManager ? (
        <Task title={title} setTitle={setTitle} isCreate onSubmit={onSubmit} />
      ) : (
        redirect(`${routes.managerDashboard}/${board_id}`)
      )}
    </>
  );
};
