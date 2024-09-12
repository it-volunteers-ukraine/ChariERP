'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Roles } from '@/types';
import { useRole } from '@/context';
import { Info } from '@/assets/icons';

import { getStyles } from './styles';
import { IBoardCardProps } from './types';
import { BoardInfo } from './board-info';
import { useRouter } from 'next/navigation';
import { routes } from '@/constants';
import { CreateCard } from './create-card';

export const BoardCard = ({ boardData, sumBoards, limitOfCard = 5 }: IBoardCardProps) => {
  const { role } = useRole();
  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);
  const [isGoRoute, setIsGoRoute] = useState(true);

  const messages = useTranslations('board');

  const isBoardData = !!boardData;
  const isRoleAccess = role !== Roles.USER;
  const cardIndex = isBoardData ? boardData.number + 1 : undefined;
  const isLastCard = isBoardData && cardIndex === sumBoards;
  const isCardLimit = cardIndex !== undefined && isBoardData && cardIndex >= limitOfCard && isRoleAccess;
  const isCreateCard = isRoleAccess && isLastCard && !isCardLimit;

  const styles = getStyles({
    isEdit,
    isBoard: !!cardIndex,
    isLimitExceeded: isLastCard && isCardLimit,
    isCreateNew: sumBoards === 0 || isCreateCard,
  });

  if (boardData === undefined && isRoleAccess) {
    return <CreateCard setIsEdit={setIsEdit} isEdit={isEdit} sumBoards={sumBoards} styles={styles} />;
  }

  return (
    <>
      {!!boardData && (
        <div
          className={styles.wrapper}
          onClick={() => {
            if (isGoRoute) {
              router.push(`${routes.boards}/${boardData.id}`);
            } else {
              setIsGoRoute(true);
            }
          }}
        >
          <BoardInfo isRoleAccess={isRoleAccess} setIsGoRoute={setIsGoRoute} boardData={boardData} />
        </div>
      )}
      {isLastCard && isCardLimit && (
        <div className={styles.wrapperLimit}>
          <Info className="w-10 h-10 text-red mb-2" />
          <p className={styles.text}>{messages('limitExceeded', { int: limitOfCard })}</p>
        </div>
      )}

      {isCreateCard && <CreateCard setIsEdit={setIsEdit} isEdit={isEdit} sumBoards={sumBoards} styles={styles} />}
    </>
  );
};
