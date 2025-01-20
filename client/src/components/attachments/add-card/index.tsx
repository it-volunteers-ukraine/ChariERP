import { Plus } from '@/assets/icons';

import { Wrapper } from '../wrapper';

export const AddCard = ({ addFile }: { addFile: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <Wrapper>
      <label className="flex h-full w-full flex-col items-center justify-center">
        <Plus className="h-[40px] w-[40px] text-lynch/50" />

        <span className="text-lynch/50">Прикріпити файл</span>

        <input
          multiple
          type="file"
          className="hidden"
          onChange={addFile}
          accept=".jpg,.jpeg,.png,.svg,.webp,.xls,.xlsx,.txt,.docx,.doc,.csv,.pdf,.mp3,.wav,.mp4,.rar,.zip"
        />
      </label>
    </Wrapper>
  );
};
