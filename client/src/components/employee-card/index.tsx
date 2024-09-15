'use client';

import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

import { routes } from '@/constants';

import { Info } from './info';
import { getStyles } from './styles';
import { JobTitle } from './job-title';
import { IEmployeeCardProps } from './types';
import { AvatarEmployee } from '../avatar-employee';

export const EmployeeCard = ({
  id,
  email,
  status,
  lastName,
  position,
  avatarUrl,
  firstName,
  className,
  setStatus,
  middleName,
  classNameImg,
  isStatusSelect,
  lastLogin = 'error',
}: IEmployeeCardProps) => {
  const router = useRouter();
  const params = useParams();
  const isParamsId = params?.id;
  const styles = getStyles({ className });
  const cardTranslate = useTranslations('employeeCard');

  return (
    <div className={styles.wrapper} onClick={() => (isParamsId ? '' : router.push(`${routes.employees}/${id}`))}>
      <div className="flex gap-4 items-start w-full">
        <AvatarEmployee className={classNameImg} src={avatarUrl} name={firstName} surname={lastName} />

        <div className="w-[calc(100%-102px)] flex flex-col gap-1">
          <p className={styles.abbName}>{lastName}</p>
          <p className={styles.abbName}>{firstName}</p>
          <p className={`${styles.abbName} ${styles.abbNameLast}`}>{middleName}</p>

          <JobTitle jobTitle={position} />
        </div>
      </div>

      <div className="w-full flex flex-col">
        <Info label="E-mail" data={email} />
        <Info
          data={status}
          status={status}
          setStatus={setStatus}
          isStatusSelect={isStatusSelect}
          label={cardTranslate('statusText')}
        />
        <Info label={cardTranslate('lastSession')} data={lastLogin} />
      </div>
    </div>
  );
};
