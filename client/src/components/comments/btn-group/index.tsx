import { useTranslations } from 'next-intl';

import { Button } from '@/components';

interface IEditorBtnGroup {
  onSave: () => void;
  isDisabled: boolean;
  onCancel: () => void;
}

export const EditorBtnGroup = ({ onSave, isDisabled, onCancel }: IEditorBtnGroup) => {
  const btnEditor = useTranslations('editor.button');

  return (
    <div className="flex gap-5 transition-all duration-300 ease-in-out">
      <Button
        type="button"
        onClick={onSave}
        disabled={isDisabled}
        styleType="icon-primary"
        text={btnEditor('btnSave')}
        className="h-full w-[112px]"
      />
      <Button
        type="button"
        onClick={onCancel}
        className="w-[112px]"
        styleType="outline-blue"
        text={btnEditor('btnCancel')}
      />
    </div>
  );
};
