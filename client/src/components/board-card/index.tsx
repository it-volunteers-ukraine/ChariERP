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

export const BoardCard = ({
  idx,
  cardInfo,
  className,
  sumBoards,
  placeholder,
  limitOfCard = 5,
  ...props
}: IBoardCardProps) => {
  const router = useRouter();
  const { role } = useUserInfo();
  const messages = useTranslations('board');

  const [isEdit, setIsEdit] = useState(false);
  const [isGoRoute, setIsGoRoute] = useState(true);

  const isBoardData = !!cardInfo;
  const currenIdx = idx ? idx + 1 : undefined;
  const isRoleAccess = role !== Roles.USER;
  const isLimit = currenIdx === limitOfCard;
  const isLimitCard = isLimit && !!sumBoards && isRoleAccess;
  const isCreateCard = !isBoardData || (currenIdx === sumBoards && !isLimitCard && isRoleAccess);

  const styles = getStyles({ className });

  const clickBoard = () => {
    if (isGoRoute && cardInfo) {
      router.push(`${routes.boards}/${cardInfo.id}`);
    } else {
      setIsGoRoute(true);
    }
  };

  return (
    <>
      {!!cardInfo && (
        <div className={styles.wrapper} {...props} onClick={clickBoard}>
          <BoardInfo isRoleAccess={isRoleAccess} setIsGoRoute={setIsGoRoute} boardData={cardInfo} />
        </div>
      )}

      {isCreateCard && <CreateCard setIsEdit={setIsEdit} isEdit={isEdit} sumBoards={sumBoards + 1} styles={styles} />}

      {isLimitCard && (
        <>
          <div className={styles.wrapperLimit}>
            <Info className="mb-2 h-10 w-10 text-red" />
            <p className={styles.text}>{messages('limitExceeded', { int: limitOfCard })}</p>
          </div>
        </>
      )}

      {placeholder && <div className={styles.placeholder} {...props}></div>}
    </>
  );
};
