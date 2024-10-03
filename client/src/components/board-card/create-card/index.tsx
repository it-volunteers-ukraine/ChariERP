import { useTranslations } from 'next-intl';

import { Plus } from '@/assets/icons';

import { BoardInfo } from '../board-info';
import { ICreateCardProps } from './types';

export const CreateCard = ({ setIsEdit, isEdit, sumBoards, styles }: ICreateCardProps) => {
  const messages = useTranslations('board');

  return (
    <div className={styles.wrapperCreate} onClick={() => setIsEdit(true)}>
      {isEdit ? (
        <BoardInfo isRoleAccess setIsEdit={setIsEdit} number={sumBoards + 1} />
      ) : (
        <>
          <Plus className="mb-2 h-10 w-10 text-greenNormal" />
          <p className={styles.text}>{messages('createNew')}</p>
        </>
      )}
    </div>
  );
};
