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
