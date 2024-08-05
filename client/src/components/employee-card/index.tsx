'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { routes } from '@/constants';

import { Info } from './info';
import { getStyles } from './styles';
import { JobTitle } from './job-title';
import { IEmployeeCardProps } from './types';
import { AvatarEmployee } from '../avatar-employee';

export const EmployeeCard = ({
  id,
  src,
  name,
  email,
  status,
  surname,
  jobTitle,
  className,
  patronymic,
  lastSession,
}: IEmployeeCardProps) => {
  const router = useRouter();
  const cardTranslate = useTranslations('employeeCard');
  const styles = getStyles({ className });

  return (
    <div className={styles.wrapper} onClick={() => router.push(`${routes.employees}/${id}`)}>
      <div className="flex gap-4 items-start">
        <AvatarEmployee src={src} name={name} surname={surname} />

        <div className="w-[calc(100%-102px)] flex flex-col gap-1">
          <p className={styles.abbName}>{name}</p>
          <p className={styles.abbName}>{surname}</p>
          <p className={`${styles.abbName} ${styles.abbNameLast}`}>{patronymic}</p>

          <JobTitle jobTitle={jobTitle} />
        </div>
      </div>

      <div className="w-full flex flex-col">
        <Info label="Email" data={email} />
        <Info label={cardTranslate('statusText')} data={status} status={status} />
        <Info label={cardTranslate('lastSession')} data={lastSession} />
      </div>
    </div>
  );
};
