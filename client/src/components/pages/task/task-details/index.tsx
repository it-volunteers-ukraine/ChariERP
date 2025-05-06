import { useTranslations } from 'next-intl';

import { ITaskResponse } from '@/types';
import { Select } from '@/components/select';
import { DateComponent } from '@/components/date-picker';
import { InputTypeEnum } from '@/components/date-field/types';
import { DateInputWithLabel } from '@/components/date-input-with-label';

import { priorityMock } from './mock';
import { useDateUpdateEnd, useDateUpdateStart, usePriorityUpdate, useStatusUpdate } from '../api';

interface ITaskDetailsProps {
  task: ITaskResponse;
}

export const TaskDetails = ({ task }: ITaskDetailsProps) => {
  const t = useTranslations('taskPage');

  const { isPendingStart, updateDateStart, dateStart } = useDateUpdateStart({
    taskId: task.id,
    initialDate: task.dateStart,
  });

  const { dateEnd, isPendingEnd, updateDateEnd } = useDateUpdateEnd({
    taskId: task.id,
    initialDate: task.dateEnd,
  });

  const { isPendingStatus, status, updateStatus } = useStatusUpdate({
    taskId: task.id,
    column: task.boardColumnId,
  });

  const { isPendingPriority, newPriority, updatePriority } = usePriorityUpdate({
    taskId: task.id,
    initialPriority: task.priority,
  });

  const handleDateStartChange = (date: Date | null) => {
    if (date) {
      updateDateStart(date);
    }
  };
  const handleDateEndChange = (date: Date | null) => {
    if (date) {
      updateDateEnd(date);
    }
  };

  const selectedPriority = priorityMock.find((option) => option.value === newPriority) || null;

  return (
    <div className="flex w-full flex-col justify-between gap-y-5 md:flex-row md:gap-10 desktop:justify-between">
      <div className="flex w-full flex-col gap-5 md:ml-8 laptop:ml-0 desktop:max-w-[451px]">
        <div className="desktop:flex desktop:justify-between">
          <h4 className="mb-2 desktop:mb-0">{t('details.status')}</h4>
          <Select
            name="status"
            placeholder={t('details.placeholder')}
            isLoading={isPendingStatus}
            classNameWrapper="desktop:w-[291px]"
            onChange={(value) => updateStatus(value.id)}
            selected={{ id: status.id, value: status.title }}
            options={task.columnsList.map((column) => ({ id: column.id, value: column.title }))}
          />
        </div>

        <div className="desktop:flex desktop:justify-between">
          <h4 className="mb-2 desktop:mb-0">{t('details.priority')}</h4>
          <Select
            withTranslate
            name="priority"
            isLoading={isPendingPriority}
            translation="taskPage.details"
            classNameWrapper="desktop:w-[291px]"
            placeholder={t('details.placeholder')}
            onChange={(value) => updatePriority(value.value.toString())}
            selected={selectedPriority ? selectedPriority : { id: '', value: '' }}
            options={priorityMock.map((field) => ({ id: field.id, value: field.value }))}
          />
        </div>
      </div>

      <div className="flex w-full justify-between gap-5 md:flex-col md:gap-5 desktop:max-w-[451px]">
        <DateInputWithLabel label={t('details.startDate')} isLoading={isPendingStart}>
          <DateComponent
            name="dateStart"
            value={dateStart}
            placeholder="24.24.24"
            inputClass="rounded-lg"
            onChange={handleDateStartChange}
            wrapperClass="w-full desktop:w-[291px]"
            inputType={InputTypeEnum.DATE_WITH_LABEL}
          />
        </DateInputWithLabel>

        <DateInputWithLabel label={t('details.endDate')} isLoading={isPendingEnd}>
          <DateComponent
            name="dateEnd"
            value={dateEnd}
            placeholder="24.24.24"
            inputClass="rounded-lg"
            onChange={handleDateEndChange}
            wrapperClass="w-full desktop:w-[291px]"
            inputType={InputTypeEnum.DATE_WITH_LABEL}
          />
        </DateInputWithLabel>
      </div>
    </div>
  );
};
