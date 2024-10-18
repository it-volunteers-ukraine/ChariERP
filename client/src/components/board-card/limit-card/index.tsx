import { memo } from 'react';
import { useTranslations } from 'next-intl';

import { Info } from '@/assets/icons';

const LimitCardComponent = ({ limit = 5 }: { limit?: number }) => {
  const messages = useTranslations('board');

  console.log({ messages: 'limit' });

  return (
    <div className="flex h-[248px] flex-col items-center justify-center shadow-transparent tablet:h-[200px] laptop:h-[242px] desktop:h-[176px]">
      <Info className="mb-2 h-10 w-10 text-red" />
      <p className="w-[191px] select-none text-center font-scada text-[20px] leading-6 text-lynch opacity-50">
        {messages('limitExceeded', { int: limit })}
      </p>
    </div>
  );
};

export const LimitCard = memo(LimitCardComponent);
