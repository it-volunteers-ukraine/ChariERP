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
  setStatus,
  patronymic,
  lastSession,
  classNameImg,
  isStatusSelect,
}: IEmployeeCardProps) => {
  const router = useRouter();
  const styles = getStyles({ className });
  const cardTranslate = useTranslations('employeeCard');

  return (
    <div className={styles.wrapper} onClick={() => router.push(`${routes.employees}/${id}`)}>
      <div className="flex gap-4 items-start w-full">
        <AvatarEmployee className={classNameImg} src={src} name={name} surname={surname} />

        <div className="w-[calc(100%-102px)] flex flex-col gap-1">
          <p className={styles.abbName}>{name}</p>
          <p className={styles.abbName}>{surname}</p>
          <p className={`${styles.abbName} ${styles.abbNameLast}`}>{patronymic}</p>

          <JobTitle jobTitle={jobTitle} />
        </div>
      </div>

      <div className="w-full flex flex-col">
        <Info label="Email" data={email} />
        <Info
          data={status}
          status={status}
          setStatus={setStatus}
          isStatusSelect={isStatusSelect}
          label={cardTranslate('statusText')}
        />
        <Info label={cardTranslate('lastSession')} data={lastSession} />
      </div>
    </div>
  );
};
