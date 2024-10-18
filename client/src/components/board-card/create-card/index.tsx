import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Plus } from '@/assets/icons';

import { BoardInfo } from '../board-info';
import { ICreateCardProps } from './types';
import { getBoardStyles } from '../board-styles';

export const CreateCard = ({ boardLength }: ICreateCardProps) => {
  const messages = useTranslations('board');

  const [isEdit, setIsEdit] = useState(false);

  const styles = getBoardStyles();

  // useOutsideClick(ref, () => setIsEdit(false));

  return (
    <>
      {isEdit && <BoardInfo isRoleAccess setIsEdit={setIsEdit} number={boardLength} />}

      {!isEdit && (
        <div className={styles.wrapperCreate} onClick={() => setIsEdit(true)}>
          <Plus className="mb-2 h-10 w-10 text-greenNormal" />
          <p className={styles.text}>{messages('createNew')}</p>
        </div>
      )}
    </>
  );
};
