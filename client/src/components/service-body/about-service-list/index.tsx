import { useTranslations } from 'next-intl';

import { cn } from '@/utils';

interface IAboutServiceListProps {
  list?: string[];
  className?: string;
  listTextStyle?: string;
}

export const AboutServiceList = ({ className, list, listTextStyle }: IAboutServiceListProps) => {
  const aboutService = useTranslations(`aboutService`);

  return (
    <ul className={cn('list-disc', className)}>
      {list?.map((text, idx) => (
        <li className={cn('font-scada', listTextStyle)} key={`${text}_${idx}`}>
          {aboutService(text)}
        </li>
      ))}
    </ul>
  );
};
