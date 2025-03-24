import { Clip, Comment, SubMenu } from '@/assets/icons';
import { Title } from '../title';
import { EditorTask } from './editorTask';
import { CommentEditor } from '@/components/comments';
import { Attachments } from '@/components/attachments';

export const DescriptionSection = () => {
  return (
    <section className="rounded-[8px] bg-white p-3 shadow-task">
      <Title icon={SubMenu} title="Опис" />
      <EditorTask />
      <Title icon={Clip} title="Вкладення" className="mt-6" />
      <Attachments />
      <Title icon={Comment} title="Коментарі" className="mt-6" />
      <CommentEditor />
    </section>
  );
};
