'use client';

import { useRouter } from 'next/navigation';

import { ButtonIcon } from '@/components';

export const ButtonBack = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <div className="mb-4 flex items-center justify-start gap-5 border-b-2 border-lightBlue pb-6">
      <ButtonIcon type="button" icon="back" iconType="primary" onClick={() => router.back()} />
      <p className="font-scada text-[24px] font-bold uppercase leading-[120%] text-lightBlue">{title}</p>
    </div>
  );
};
