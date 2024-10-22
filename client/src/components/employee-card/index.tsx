'use client';

import { useEffect, useState, useTransition } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

import { routes } from '@/constants';
import { getImageAction } from '@/actions';

import { Info } from './info';
import { getStyles } from './styles';
import { JobTitle } from './job-title';
import { showMessage } from '../toastify';
import { IEmployeeCardProps } from './types';
import { AvatarField } from '../avatar-field';
import { EllipsisText } from '../ellipsisText';
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

  const [img, setImg] = useState('');
  const [isPending, startTransition] = useTransition();

  const isParamsId = params?.id;
  const styles = getStyles({ className });

  const cardTranslate = useTranslations('employeeCard');

  const itemClass = clsx({
    'tablet:!max-w-[calc(50%-48px)]': inById,
  });

  const loadImg = async () => {
    if (avatarUrl) {
      try {
        const response = await getImageAction(avatarUrl);

        if (response?.success && response?.image) {
          setImg(response.image);

          return;
        }

        setImg('');
        showMessage.error('Error loading image');
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    startTransition(async () => {
      loadImg();
    });
  }, [avatarUrl]);

  return (
    <div className={styles.wrapper} onClick={() => (isParamsId ? '' : router.push(`${routes.employeesEdit}/${id}`))}>
      <div className={`flex w-full items-start gap-4 ${itemClass}`}>
        {!inById && <AvatarEmployee src={img} name={firstName} surname={lastName} isLoading={isPending} />}

        {inById && <AvatarField name="avatarUrl" lastName={lastName} firstName={firstName} />}

        <div className="flex w-[calc(100%-102px)] flex-col gap-1">
          <EllipsisText content={lastName}>
            <p className={styles.abbName}>{lastName}</p>
          </EllipsisText>
          <EllipsisText content={firstName}>
            <p className={styles.abbName}>{firstName}</p>
          </EllipsisText>
          <EllipsisText content={middleName}>
            <p className={`${styles.abbName} ${styles.abbNameLast}`}>{middleName}</p>
          </EllipsisText>

          <JobTitle jobTitle={position} />
        </div>
      </div>

      <div className={`flex w-full flex-col ${itemClass}`}>
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
