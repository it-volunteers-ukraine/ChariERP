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
  placeholder,
  className,
  cardInfo,
  sumBoards,
  limitOfCard = 5,
  ...props
}: IBoardCardProps) => {
  const { role } = useUserInfo();
  const router = useRouter();
  const messages = useTranslations('board');

  const [isEdit, setIsEdit] = useState(false);
  const [isGoRoute, setIsGoRoute] = useState(true);

  const isBoardData = !!cardInfo;
  const isRoleAccess = role !== Roles.USER;
  const isLimit = sumBoards ? sumBoards >= limitOfCard : undefined;
  const isCreateCard = !isBoardData && !isLimit && (sumBoards || sumBoards === 0) && isRoleAccess;
  const isLimitCard = !isBoardData && isLimit && sumBoards && isRoleAccess;

  const styles = getStyles({
    isEdit,
    className,
  });

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
        <div className={styles.wrapper} {...props} onClick={() => clickBoard()}>
          <BoardInfo isRoleAccess={isRoleAccess} setIsGoRoute={setIsGoRoute} boardData={cardInfo} />
        </div>
      )}
      {isCreateCard && (
        <>
          <CreateCard setIsEdit={setIsEdit} isEdit={isEdit} sumBoards={sumBoards} styles={styles} />
          <div className={styles.wrapperClass}></div>
        </>
      )}
      {isLimitCard && (
        <>
          <div className={styles.wrapperLimit} {...props}>
            <Info className="w-10 h-10 text-red mb-2" />
            <p className={styles.text}>{messages('limitExceeded', { int: limitOfCard })}</p>
          </div>
          <div className={styles.wrapperClass}></div>
        </>
      )}
      {placeholder && <div className={styles.placeholder} {...props}></div>}
    </>
  );
};
