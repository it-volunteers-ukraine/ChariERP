import { MouseEvent } from 'react';
import { Readable } from 'stream';
import { randomInt } from 'crypto';
import { TranslationValues } from 'next-intl';

import { showMessage } from '@/components';
import { DownloadType, Fields, GetUrlProps, IOrganizations } from '@/types';

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

export const renameFile = (file: File) => {
  return new File([file], encodeURIComponent(file.name), {
    type: file.type,
    lastModified: file.lastModified,
  });
};

export const getExtensionForBase64 = (url: string) => {
  const extension = url.split('.')?.pop()?.toLowerCase();

  return switchExtension(extension!);
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

export const streamToBase64 = async (stream: Readable) => {
  const chunks: Buffer[] = [];

  return new Promise<string>((resolve, reject) => {
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });

    stream.on('end', () => {
      const buffer = Buffer.concat(chunks);

      resolve(buffer.toString('base64'));
    });

    stream.on('error', reject);
  });
};

export function generatePassword(minLength: number = 8, maxLength: number = 20): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const passwordLength = randomInt(minLength, maxLength + 1);
  let password = '';

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = randomInt(0, alphabet.length);

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

export const getHtmlCodeForPassword = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => `<div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2 style="color: #333;">Ваші дані для входу</h2>
    <p style="margin-bottom: 20px;">
    <strong>Email</strong>:
    <span style="font-weight: bold; color: #1a73e8; background-color: #f1f1f1; padding: 10px; border-radius: 5px;">${email}</span>
    </p>
    <p>
    <strong>Пароль</strong>:
    <span style="font-weight: bold; color: #333; background-color: #f1f1f1; padding: 10px; border-radius: 5px;">${password}</span>
    </p>
    </div>`;

export function checkFieldsToUniqueOfOrganization<T extends Fields>(
  fields: T,
  organizations: IOrganizations[],
): string[] {
  const arr = organizations.map(({ organizationData, contactData }) => ({
    edrpou: organizationData.edrpou,
    email: contactData.email,
  }));

  const matches: string[] = [];

  arr.forEach(({ edrpou, email }) => {
    if (edrpou === fields.edrpou) {
      matches.push(edrpou);
    }

    if (email === fields.email) {
      matches.push(email);
    }
  });

  return matches;
}

export function showErrorMessageOfOrganizationExist(
  error: (key: string, params?: TranslationValues) => string,
  data: unknown[],
) {
  const text = data.join(` ${error('or')} `);

  return showMessage.error(error('companyAlreadyRegistered', { errors: text }), { autoClose: 5000 });
}

export const onCopy = (e: MouseEvent<SVGElement | HTMLButtonElement>, text: number | string, messages: string) => {
  e.stopPropagation();
  navigator.clipboard.writeText(text.toString());
  showMessage.success(messages, { autoClose: 500 });
};

export const cleanSpaces = (str: string) => str.trim().replace(/\s+/g, ' ');
