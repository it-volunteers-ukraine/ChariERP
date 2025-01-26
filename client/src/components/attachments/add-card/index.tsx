import { useTranslations } from 'next-intl';

import { Plus } from '@/assets/icons';

import { Wrapper } from '../wrapper';

export const AddCard = ({ addFile }: { addFile: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const text = useTranslations('attachments');
  const formatFiles = '.jpg,.jpeg,.png,.svg,.webp,.xls,.xlsx,.txt,.docx,.doc,.csv,.pdf,.mp3,.wav,.mp4,.rar,.zip';

  return (
    <Wrapper>
      <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
        <Plus className="h-[40px] w-[40px] text-lynch/50" />

        <span className="text-lynch/50">{text('attachFile')}</span>

        <input multiple type="file" className="hidden" onChange={addFile} accept={formatFiles} />
      </label>
    </Wrapper>
  );
};
