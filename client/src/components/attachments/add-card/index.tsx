import { useTranslations } from 'next-intl';

import { Plus } from '@/assets/icons';
import { filesFormat } from '@/constants';

import { Wrapper } from '../wrapper';

interface AddCardProps {
  disabled: boolean;
  addFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddCard = ({ addFile, disabled }: AddCardProps) => {
  const text = useTranslations('attachments');

  return (
    <Wrapper>
      <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
        <Plus className="h-[40px] w-[40px] text-lynch/50" />

        <span className="text-lynch/50">{text('attachFile')}</span>

        <input multiple type="file" className="hidden" disabled={disabled} onChange={addFile} accept={filesFormat} />
      </label>
    </Wrapper>
  );
};
