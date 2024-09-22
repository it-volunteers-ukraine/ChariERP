'use client';

import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';

import { routes } from '@/constants';

import { Info } from './info';
import { getStyles } from './styles';
import { JobTitle } from './job-title';
import { IEmployeeCardProps } from './types';
import { AvatarField } from '../avatar-field';
import { AvatarEmployee } from '../avatar-employee';

export const EmployeeCard = ({
  id,
  email,
  inById,
  status,
  lastName,
  position,
  firstName,
  className,
  fieldName,
  avatarUrl,
  middleName,
  setFieldValue,
  isStatusSelect,
  lastLogin = 'error',
}: IEmployeeCardProps) => {
  const router = useRouter();
  const params = useParams();

  const isParamsId = params?.id;
  const styles = getStyles({ className });

  const cardTranslate = useTranslations('employeeCard');

  const itemClass = clsx('', {
    'tablet:!max-w-[calc(50%-48px)]': inById,
  });

  return (
    <div className={styles.wrapper} onClick={() => (isParamsId ? '' : router.push(`${routes.employeesEdit}/${id}`))}>
      <div className={`flex gap-4 items-start w-full ${itemClass}`}>
        {!inById && <AvatarEmployee src={avatarUrl} name={firstName} surname={lastName} />}

        {inById && <AvatarField name="avatarUrl" lastName={lastName} firstName={firstName} />}

        <div className="w-[calc(100%-102px)] flex flex-col gap-1">
          <p className={styles.abbName}>{lastName}</p>
          <p className={styles.abbName}>{firstName}</p>
          <p className={`${styles.abbName} ${styles.abbNameLast}`}>{middleName}</p>

          <JobTitle jobTitle={position} />
        </div>
      </div>

      <div className={`w-full flex flex-col ${itemClass}`}>
        <Info label="E-mail" data={email} />
        <Info
          status={status}
          fieldName={fieldName}
          data={status as string}
          setFieldValue={setFieldValue}
          isStatusSelect={isStatusSelect}
          label={cardTranslate('statusText')}
        />
        <Info label={cardTranslate('lastSession')} data={lastLogin} />
      </div>
    </div>
  );
};
