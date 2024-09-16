'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Roles } from '@/types';
import { routes } from '@/constants';
import { Info } from '@/assets/icons';
import { useUserInfo } from '@/context';

import { getStyles } from './styles';
import { BoardInfo } from './board-info';
import { IBoardCardProps } from './types';
import { CreateCard } from './create-card';

export const BoardCard = ({ className, boardData, sumBoards, limitOfCard = 5 }: IBoardCardProps) => {
  const { role } = useUserInfo();
  const router = useRouter();
  const messages = useTranslations('board');

  const [isEdit, setIsEdit] = useState(false);
  const [isGoRoute, setIsGoRoute] = useState(true);

  const isBoardData = !!boardData;
  const isRoleAccess = role !== Roles.USER;
  const cardIndex = isBoardData ? boardData.number + 1 : undefined;
  const isLastCard = isBoardData && cardIndex === sumBoards;
  const isCardLimit = cardIndex !== undefined && isBoardData && cardIndex >= limitOfCard && isRoleAccess;
  const isCreateCard = isRoleAccess && isLastCard && !isCardLimit;

  const styles = getStyles({
    isEdit,
    className,
    isBoard: !!cardIndex,
    isLimitExceeded: isLastCard && isCardLimit,
    isCreateNew: sumBoards === 0 || isCreateCard,
  });

  if (boardData === undefined && isRoleAccess) {
    return <CreateCard setIsEdit={setIsEdit} isEdit={isEdit} sumBoards={sumBoards} styles={styles} />;
  }

  const clickBoard = () => {
    if (isGoRoute && boardData) {
      router.push(`${routes.boards}/${boardData.id}`);
    } else {
      setIsGoRoute(true);
    }
  };

  return (
    <>
      {!!boardData && (
        <div className={styles.wrapper} onClick={() => clickBoard}>
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
