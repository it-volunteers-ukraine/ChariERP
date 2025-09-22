'use client';

import { useEffect, useState, useTransition } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

import { routes } from '@/constants';
import { useUserInfo } from '@/context';
import { getImageAction } from '@/actions';
import { EllipsisText } from '@/components';

import { Info } from './info';
import { getStyles } from './styles';
import { JobTitle } from './job-title';
import { showMessage } from '../toastify';
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
  const { isManager } = useUserInfo();

  const [img, setImg] = useState('');
  const [isPending, startTransition] = useTransition();

  const isParamsId = params?.id;
  const styles = getStyles({ className, isManager });

  const cardTranslate = useTranslations('employeeCard');
  const lastLoginTranslate = useTranslations('errors.employee');

  const itemClass = clsx({
    'tablet:!max-w-[calc(50%-48px)]': inById,
  });

  const handleClick = () => {
    if (!isManager) return;
    if (isParamsId) return;
    router.push(`${routes.employeesEdit}/${id}`);
  };

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
    startTransition(() => {
      loadImg();
    });
  }, [avatarUrl]);

  const loginTranslate = lastLogin === 'lastLogin' ? lastLoginTranslate(lastLogin) : lastLogin;

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <div className={`flex w-full items-start gap-4 ${itemClass}`}>
        {!inById && <AvatarEmployee src={img} name={firstName} surname={lastName} isLoading={isPending} />}
        {inById && <AvatarField name="avatarUrl" lastName={lastName} firstName={firstName} />}
        <div className="flex w-[calc(100%-102px)] flex-col gap-1">
          <EllipsisText delay={0} content={lastName}>
            <p className={styles.abbName}>{lastName}</p>
          </EllipsisText>
          <EllipsisText delay={0} content={firstName}>
            <p className={styles.abbName}>{firstName}</p>
          </EllipsisText>
          <EllipsisText delay={0} content={middleName}>
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
        <Info label={cardTranslate('lastSession')} data={loginTranslate} />
      </div>
    </div>
  );
};
