'use client';

import { useState } from 'react';
import { redirect, useParams } from 'next/navigation';

import { routes } from '@/constants';
import { useUserInfo } from '@/context';

import { Task } from '..';
import { useAddTask } from '../api/use-add';

const task = {
  comments: [],
  attachment: [],
  priority: 'high',
  date_end: new Date(),
  status: 'in_progress',
  date_start: new Date(),
  description: 'Task description',
};

export const NewTask = () => {
  const { board_id, column_id } = useParams<{ board_id: string; column_id: string }>();

  const { isManager, _id } = useUserInfo();

  const [title, setTitle] = useState('');

  const id = _id ? String(_id) : undefined;

  const { addTask } = useAddTask({ userId: id!, boardId: board_id!, columnId: column_id! });

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
