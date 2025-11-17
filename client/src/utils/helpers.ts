import { MouseEvent } from 'react';
import { TranslationValues } from 'next-intl';

import { showMessage } from '@/components';

// Re-export all backend helpers
export * from './helpers.backend';

// Only keep functions that depend on UI components
export const openNewWindowForCertificate = (certificate: string) => {
  const isPdf = certificate.startsWith('data:application/pdf;');
  const newWindow = window.open();

  if (newWindow) {
    newWindow.document.write(
      `<embed style="width: 100%; ${isPdf ? 'height: 100dvh' : ''};" src="${certificate}" alt=${certificate} />`,
    );
    newWindow.document.close();
  } else {
    showMessage.warn('Failed to open a new window. Please check your browser settings.');
  }
};

export function showErrorMessageOfOrganizationExist(
  error: (key: string, params?: TranslationValues) => string,
  data: unknown[],
) {
  const text = data.join(` ${error('or')} `);

  return showMessage.error(error('companyAlreadyRegistered', { errors: text }), { autoClose: 5000 });
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
