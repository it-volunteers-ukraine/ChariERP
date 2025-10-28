'use client';
import { MaterialTable } from '@/components';
import { SelectFactory } from '@/components/custom-select/fabric';
import { BaseSelectWithTranslate } from '@/components/custom-select/variant';
import { Roles } from '@/types';

export const FixedAssetsPage = () => {
  const task = {
    columnsList: [
      { id: '1', title: 'todo' },
      { id: '2', title: 'in_progress' },
      { id: '3', title: 'done' },
    ],
  };
  const notask = {
    columnsList: [
      { id: '1', title: 'todo2' },
      { id: '2', title: 'in_progress2' },
      { id: '3', title: 'done2' },
    ],
  };

  return (
    <div>
      <BaseSelectWithTranslate
        role={Roles.MANAGER}
        name="status"
        isLoading={false}
        classNameWrapper="desktop:w-[291px]"
        placeholder={'details.placeholder'}
        onChange={(value) => value.value.toString()}
        selected={{ id: '', value: '' }}
        options={task.columnsList.map((column) => ({
          id: column.id,
          value: column.title,
        }))}
      />

      <SelectFactory
        variant="default"
        role={Roles.MANAGER}
        name="status"
        isLoading={false}
        classNameWrapper="desktop:w-[291px]"
        placeholder={'details.placeholder'}
        onChange={(value) => value.value.toString()}
        selected={{ id: '', value: '' }}
        options={notask.columnsList.map((column) => ({
          id: column.id,
          value: column.title,
        }))}
      />
      <SelectFactory
        variant="with-add-options"
        role={Roles.MANAGER}
        name="status"
        isLoading={false}
        classNameWrapper="desktop:w-[291px]"
        placeholder={'details.placeholder'}
        onChange={(value) => value.value.toString()}
        selected={{ id: '', value: '' }}
        options={notask.columnsList.map((column) => ({
          id: column.id,
          value: column.title,
        }))}
      />
      <MaterialTable />
    </div>
  );
};
