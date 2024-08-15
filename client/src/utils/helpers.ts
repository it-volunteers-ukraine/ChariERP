import { DownloadType, GetUrlProps } from '@/types';

export const dateFormat: Record<string, string> = {
  ua: 'dd.MM.yyyy',
  en: 'MM.dd.yyyy',
};

export const getUrlWithExtension = async ({ url, file, downloadType = DownloadType.URL }: GetUrlProps) => {
  const byteArray = await file.transformToByteArray();
  const extension = url.split('.')?.pop()?.toLowerCase();

  let mimeType = 'application/octet-stream';
  const fileName = url.split('/')[2];

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

  if (downloadType === DownloadType.FILE) {
    return new File([blob], fileName, { type: mimeType });
  }

  return URL.createObjectURL(blob);
};

export function generatePassword(minLength: number = 8, maxLength: number = 20): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let password = '';

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);

    password += alphabet[randomIndex];
  }

  return password;
}

export const createFile = (filename: string, extension: string) => {
  const fileContent = new Blob(['\x00'], { type: 'application/octet-stream' });

  const file = new File([fileContent], `${filename}.${extension}`, { type: fileContent.type });

  return file;
};
