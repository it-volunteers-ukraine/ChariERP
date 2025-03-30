import { useTranslations } from 'next-intl';

import { CommentEditor } from '@/components/comments';
import { Attachments } from '@/components/attachments';
import { Clip, Comment, SubMenu } from '@/assets/icons';

import { Title } from '../title';
import { getStyles } from './styles';
import { EditorTask } from '../editorTask';

export const DescriptionSection = () => {
  const text = useTranslations('taskPage');

  const styles = getStyles();

  return (
    <section className={styles.wrapper}>
      <Title icon={SubMenu} title={text('taskDescription.title')} />
      <EditorTask />
      <Title icon={Clip} title={text('attachments.title')} className={styles.title} />
      <Attachments />
      <Title icon={Comment} title={text('comments.title')} className={styles.title} />
      <CommentEditor />
    </section>
  );
};
