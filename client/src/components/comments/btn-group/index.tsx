import { Button } from '@/components/button';
import { useTranslations } from 'next-intl';

interface IEditorBtnGroup {
  onSave: () => void;
  isDisabled: boolean;
  setIsEditing: (id: string | null | false) => void;
}

export const EditorBtnGroup = ({ onSave, isDisabled, setIsEditing }: IEditorBtnGroup) => {
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
        className="w-[112px]"
        styleType="outline-blue"
        text={btnEditor('btnCancel')}
        onClick={() => {
          setIsEditing(false);
        }}
      />
    </div>
  );
};
