import { MouseEvent } from 'react';
import { Readable } from 'stream';
import { randomInt } from 'crypto';
import { TranslationValues } from 'next-intl';

import { showMessage } from '@/components';
import { Fields, IOrganizations } from '@/types';

const switchExtension = (extension: string) => {
  if (extension === 'pdf') {
    return 'application/pdf';
  } else {
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

export const openNewWindowForCertificate = (certificate: string) => {
  const newWindow = window.open();

  if (newWindow) {
    newWindow.document.write(`<img style="width: 100%; max-width: 100%;" src="${certificate}" alt=${certificate} />`);
    newWindow.document.close();
  } else {
    showMessage.warn('Failed to open a new window. Please check your browser settings.');
  }
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

  return new File([fileContent], `${filename}.${extension}`, { type: fileContent.type });
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
  data: unknown[] | string,
) {
  if (Array.isArray(data)) {
    const text = data.join(` ${error('or')} `);

    return showMessage.error(error('login.companyAlreadyRegistered', { errors: text }), { autoClose: 5000 });
  }

  return showMessage.error(error(data), { autoClose: 5000 });
}

export const onCopy = <T extends MouseEvent<HTMLElement | SVGElement> = MouseEvent<SVGElement | HTMLButtonElement>>(
  e: T,
  text: number | string,
  messages: string,
) => {
  e.stopPropagation();
  navigator.clipboard.writeText(text.toString());
  showMessage.success(messages, { autoClose: 500 });
};

export const lettersToColor = (firstName: string, lastName: string) => {
  // Capitalize both first letters for consistency
  const char1 = firstName[0].toUpperCase();
  const char2 = lastName[0].toUpperCase();

  // Get ASCII codes for both letters
  const charCode1 = char1.charCodeAt(0);
  const charCode2 = char2.charCodeAt(0);

  // Combining ASCII codes for RGB generation
  const red = (charCode1 * 23 + charCode2 * 17) % 256;
  const green = (charCode1 * 47 + charCode2 * 31) % 256;
  const blue = (charCode1 * 71 + charCode2 * 29) % 256;

  // Convert RGB values to hex format
  return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
};
export const cleanSpaces = (str: string) => str.trim().replace(/\s+/g, ' ');

export const generateKey = (array: string[], key: string) => {
  return array.map((_, idx) => `${key}.${idx}`);
};
