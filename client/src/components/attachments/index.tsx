'use client';

import { Loader } from '@/assets/icons';
import { IAttachmentFileResponse } from '@/types';

import { Wrapper } from './wrapper';
import { AddCard } from './add-card';
import { getStyles } from './styles';
import { FileCard } from './file-card';
import { useFile } from '../pages/task/api/use-file';

interface IAttachments {
  taskId: string;
  fileList: IAttachmentFileResponse[];
}

export const Attachments = ({ taskId, fileList }: IAttachments) => {
  const { uploadFile, files, deleteFile, isDownloading, isUploading, isDeleting } = useFile({ taskId, fileList });

  const handleRemoveFile = (id: string) => {
    deleteFile(id);
  };

  const isDisabled = isDownloading || isUploading || !!isDeleting;

  const styles = getStyles();

  return (
    <div className={styles.wrapper}>
      {isDownloading && (
        <Wrapper className={styles.wrapperLoader}>
          <Loader className={styles.loader} />
        </Wrapper>
      )}

      {!isDownloading && <AddCard disabled={isDisabled} addFile={uploadFile} />}

      {!isDownloading &&
        files.map(({ body, preview, id }) => (
          <FileCard
            key={id}
            file={body}
            preview={preview}
            disabled={isDisabled}
            isDeleting={isDeleting === id}
            removeFile={() => handleRemoveFile(id)}
          />
        ))}
      {isUploading && (
        <Wrapper className={styles.wrapperLoader}>
          <Loader className={styles.loader} />
        </Wrapper>
      )}
    </div>
  );
};
