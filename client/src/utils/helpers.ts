import { GetUrlProps } from '@/types';

export const dateFormat: Record<string, string> = {
  ua: 'dd.MM.yyyy',
  en: 'MM.dd.yyyy',
};

export const getUrlWithExtension = async ({ url, file }: GetUrlProps) => {
  const byteArray = await file.transformToByteArray();
  const extension = url.split('.')?.pop()?.toLowerCase();

  let mimeType = 'application/octet-stream';

  switch (extension) {
    case 'pdf':
      mimeType = 'application/pdf';
      break;
    case 'jpg':
    case 'gif':
    case 'jpeg':
      mimeType = `image/${extension}`;
      break;
    default:
      console.warn('Unknown file extension:', extension);
  }

  const blob = new Blob([byteArray], { type: mimeType });

  return URL.createObjectURL(blob);
};
