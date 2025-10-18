import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { base64ToBlob } from '@/utils';
import { fileConfigAttachment } from '@/constants';
import { showMessage } from '@/components/toastify';
import { IAttachmentFileResponse, IFileResponse, ResponseGetType } from '@/types';
import { deleteFileAction, downloadFileAction, uploadFileAction } from '@/actions';

type FileState = { id: string; body: File; preview?: string };

export const useFile = ({ taskId, fileList }: { taskId: string; fileList: IAttachmentFileResponse[] }) => {
  const [files, setFiles] = useState<FileState[]>([]);

  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<boolean | string>(false);

  const error = useTranslations('validation');

  useEffect(() => {
    if (fileList.length > 0 && files.length === 0) {
      downloadFile();
    }
  }, [taskId]);

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);

      const selectedFiles = event.target.files;

      if (!selectedFiles) {
        return;
      }

      const newFiles = Array.from(selectedFiles);

      event.target.value = '';

      if (files.length + newFiles.length > fileConfigAttachment.limit) {
        showMessage.error(error('maxFiles', { maxFiles: `${fileConfigAttachment.limit}` }));

        return;
      }

      const existingFileNames = new Set(files.map((file) => file.body.name));

      const validFiles: File[] = [];
      const invalidSize: string[] = [];
      const duplicateFiles: string[] = [];
      const invalidExtension: string[] = [];

      for (const file of newFiles) {
        const extension = file.name.split('.').pop()?.toLowerCase() || '';

        const isDuplicate = existingFileNames.has(file.name);
        const isValidSize = file.size <= fileConfigAttachment.size;
        const isValidExtension = fileConfigAttachment.extensions.includes(extension);

        if (isDuplicate) {
          duplicateFiles.push(file.name);
          continue;
        }

        if (!isValidSize) {
          invalidSize.push(file.name);
          continue;
        }

        if (!isValidExtension) {
          invalidExtension.push(file.name);
          continue;
        }

        validFiles.push(file);
      }

      if (invalidSize.length || invalidExtension.length || duplicateFiles.length) {
        let message = '';

        if (invalidSize.length > 0) {
          message +=
            invalidSize.length === 1
              ? error('maxSizeOneFile', { fileName: invalidSize[0], maxSize: fileConfigAttachment.size / 1024 / 1024 })
              : error('maxSizeMoreFile', {
                  fileName: invalidSize.join(', '),
                  maxSize: fileConfigAttachment.size / 1024 / 1024,
                });
        }

        if (invalidExtension.length > 0) {
          message +=
            invalidExtension.length === 1
              ? error('errorExtension', { fileName: invalidExtension[0] })
              : error('errorExtensions', {
                  fileName: invalidExtension.join(', '),
                });
        }

        if (duplicateFiles.length > 0) {
          message +=
            duplicateFiles.length === 1
              ? error('duplicateFile', { fileName: duplicateFiles[0] })
              : error('duplicateFiles', {
                  fileName: duplicateFiles.join(', '),
                });
        }

        showMessage.error(message.trim());
      }

      if (validFiles.length === 0) {
        return;
      }

      const formData = new FormData();

      validFiles.forEach((file) => {
        formData.append('files', file);
      });

      event.target.value = '';

      const res: ResponseGetType = await uploadFileAction({
        taskId,
        formData,
      });

      if (res.success && res.data) {
        const uploadFiles: { id: string; name: string }[] = JSON.parse(res.data);

        const resultFiles = validFiles.reduce<FileState[]>((acc, file) => {
          const match = uploadFiles.find((uploaded) => uploaded.name === file.name);

          if (!match) {
            return acc;
          }

          acc.push({
            body: file,
            id: match.id,
            preview: URL.createObjectURL(file),
          });

          return acc;
        }, []);

        setFiles((prev) => [...prev, ...resultFiles]);
      }

      if (!res.success && res.message) {
        showMessage.error(res.message);
        throw new Error(res.message);
      }
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsUploading(false);
    }
  };

  const downloadFile = async () => {
    try {
      setIsDownloading(true);

      const res: ResponseGetType = await downloadFileAction({ taskId });

      if (res.success && res.data) {
        const filesResponse: IFileResponse[] = JSON.parse(res.data);

        const downloadFiles = filesResponse.map((file) => {
          const blob = base64ToBlob(file.body, file.type);
          const newFile = new File([blob], file.name, { type: file.type });

          return {
            id: file.id,
            body: newFile,
            preview: URL.createObjectURL(newFile),
          };
        });

        setFiles([...downloadFiles]);
      }

      if (!res?.success && res?.message) {
        showMessage.error(res.message);
        throw new Error(res.message);
      }
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsDownloading(false);
    }
  };

  const deleteFile = async (id: string) => {
    try {
      setIsDeleting(id);

      const res = await deleteFileAction({ taskId, id });

      if (res.success) {
        setFiles((prev) => prev.filter((file) => file.id !== id));
      }

      if (!res?.success && res?.message) {
        showMessage.error(res.message);
        throw new Error(res.message);
      }
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return { uploadFile, files, deleteFile, isDownloading, isUploading, isDeleting };
};
