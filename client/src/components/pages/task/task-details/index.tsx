import { useTranslations } from 'next-intl';

import { useUserInfo } from '@/context';
import { useWindowWidth } from '@/hooks';
import { Select } from '@/components/select';
import { ITaskResponse, Roles } from '@/types';
import { DateComponent } from '@/components/date-picker';
import { InputTypeEnum } from '@/components/date-field/types';
import { DateInputWithLabel } from '@/components/date-input-with-label';

import { getStyles } from './style';
import { priorityMock } from './mock';
import { ParticipantsTask } from '../participants-task';
import { useDateUpdateEnd, useDateUpdateStart, usePriorityUpdate, useStatusUpdate } from '../api';

interface ITaskDetailsProps {
  boardId: string;
  isClosed?: boolean;
  task: ITaskResponse;
}

export const TaskDetails = ({ task, boardId, isClosed }: ITaskDetailsProps) => {
  const t = useTranslations('taskPage');

  const { isMobile } = useWindowWidth();

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
  const { role } = useUserInfo();

  const isManager = role === Roles.MANAGER;

  const selectedPriority = priorityMock.find((option) => option.value === newPriority) || null;

  const styles = getStyles({ isManager });

  return (
    <div>
      <div className="flex w-full flex-col justify-between gap-y-5 md:flex-row md:gap-10 desktop:justify-between">
        <div className="flex w-full flex-col gap-5 md:ml-8 laptop:ml-0 desktop:max-w-[451px]">
          <div className="desktop:flex desktop:justify-between">
            <h4 className="mb-2 desktop:mb-0">{t('details.status')}</h4>
            <Select
              name="status"
              isClosed={isClosed}
              isLoading={isPendingStatus}
              classNameWrapper="desktop:w-[291px]"
              placeholder={t('details.placeholder')}
              onChange={(value) => updateStatus(value.id)}
              selected={{ id: status.id, value: status.title }}
              options={task.columnsList.map((column) => ({ id: column.id, value: column.title }))}
            />
          </div>

          <div className="desktop:flex desktop:justify-between">
            <h4 className="mb-2 desktop:mb-0">{t('details.priority')}</h4>
            <Select
              role={role}
              withTranslate
              name="priority"
              isClosed={isClosed}
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
        {isMobile && (
          <div className="w-full md:ml-8 laptop:ml-0 desktop:flex desktop:max-w-[451px] desktop:flex-row desktop:justify-between desktop:gap-5">
            <h4 className="mb-2 desktop:mb-0">Виконавці:</h4>
            <ParticipantsTask taskId={task.id} isClosed={isClosed} taskUsersList={task.users} boardId={boardId} />
          </div>
        )}

        <div className="flex w-full justify-between gap-5 md:flex-col md:gap-5 desktop:max-w-[451px]">
          <DateInputWithLabel label={t('details.startDate')} isLoading={isPendingStart}>
            <DateComponent
              name="dateStart"
              value={dateStart}
              disabled={!isManager}
              placeholder="24.24.24"
              inputClass="rounded-lg"
              onChange={handleDateStartChange}
              wrapperClass={styles.wrapperClassDate}
              inputType={InputTypeEnum.DATE_WITH_LABEL}
            />
          </DateInputWithLabel>

          <DateInputWithLabel label={t('details.endDate')} isLoading={isPendingEnd}>
            <DateComponent
              name="dateEnd"
              value={dateEnd}
              disabled={!isManager}
              placeholder="24.24.24"
              inputClass="rounded-lg"
              onChange={handleDateEndChange}
              wrapperClass={styles.wrapperClassDate}
              inputType={InputTypeEnum.DATE_WITH_LABEL}
            />
          </DateInputWithLabel>
        </div>
      </div>
      {!isMobile && (
        <div className="mt-5 flex w-full justify-between gap-10">
          <div className="w-full md:ml-8 laptop:ml-0 desktop:flex desktop:max-w-[451px] desktop:flex-row desktop:justify-between">
            <h4 className="mb-2 desktop:mb-0">Виконавці:</h4>
            <ParticipantsTask taskId={task.id} isClosed={isClosed} taskUsersList={task.users} boardId={boardId} />
          </div>
          <div className="w-full"></div>
        </div>
      )}
    </div>
  );
};
