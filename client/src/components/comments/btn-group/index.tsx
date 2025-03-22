import { Button } from '@/components/button';
import { useTranslations } from 'next-intl';

interface IEditorBtnGroup {
  onSave: () => void;
  onDisabled: () => boolean | undefined;
  setIsEditing: (id: string | null | false) => void;
}

export const EditorBtnGroup = ({ onSave, onDisabled, setIsEditing }: IEditorBtnGroup) => {
  const btnEditor = useTranslations('editor');

  return (
    <div className="flex gap-5 transition-all duration-300 ease-in-out">
      <Button
        type="button"
        onClick={onSave}
        disabled={onDisabled()}
        styleType="icon-primary"
        text={btnEditor('btnSave')}
        className="h-full w-[112px]"
      />
      <Button
        type="button"
        className="w-[112px]"
        styleType="outline-blue"
        text={btnEditor('btnRemove')}
        onClick={() => {
          setIsEditing(false);
        }}
      />
    </div>
  );
};
