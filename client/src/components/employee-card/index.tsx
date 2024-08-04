'use client';
import { useRouter } from 'next/navigation';

import { AvatarEmployee } from '../avatar-employee';

import { Info } from './info';
import { getStyles } from './styles';
import { JobTitle } from './job-title';
import { IEmployeeCardProps } from './types';

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
  const styles = getStyles({ className });
  const router = useRouter();

  return (
    <div className={styles.wrapper} onClick={() => router.push(`/employee/${id}`)}>
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
        <Info label="Status" data={status} status={status} />
        <Info label="Last session" data={lastSession} />
      </div>
    </div>
  );
};
