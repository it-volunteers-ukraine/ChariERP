import { DownloadType, GetUrlProps } from '@/types';

export const dateFormat: Record<string, string> = {
  ua: 'dd.MM.yyyy',
  en: 'MM.dd.yyyy',
};

const switchExtension = (extension: string) => {
  switch (extension) {
    case 'pdf':
      return 'application/pdf';
    default:
      return `image/${extension}`;
  }
};

export const getUrlWithExtension = async ({ url, file, downloadType = DownloadType.URL }: GetUrlProps) => {
  const byteArray = await file.transformToByteArray();
  const extension = url.split('.')?.pop()?.toLowerCase();

  const fileName = url.split('/')[2];

  const mimeType = switchExtension(extension!);

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
  const mimeType = switchExtension(extension!);

  const fileContent = new Blob(['\x00'], { type: mimeType });

  const file = new File([fileContent], `${filename}.${extension}`, { type: fileContent.type });

  return file;
};
