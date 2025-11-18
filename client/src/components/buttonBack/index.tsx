'use client';

import { useRouter } from 'next/navigation';

import { ButtonIcon } from '@/components';

export const ButtonBack = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <div className="border-light-blue mb-4 flex items-center justify-start gap-5 border-b-2 pb-6">
      <ButtonIcon type="button" icon="back" iconType="primary" onClick={() => router.back()} />
      <p className="font-scada text-light-blue text-[24px] leading-[120%] font-bold uppercase">{title}</p>
    </div>
  );
};
