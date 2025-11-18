import Image from 'next/image';

import { Doc } from '@/assets/icons';
import { ModalImg } from '@/components';

import { icon } from './mock';
import { RenderFileProps } from './types';

export const RenderFile = ({ file, preview }: RenderFileProps) => {
  const fileExtension = file.type.split('/').pop();
  const IconComponent = icon[fileExtension as keyof typeof icon];

  if (file.type.startsWith('image/') && !file.type.startsWith('image/svg+xml') && preview) {
    return (
      <ModalImg alt={file.name} url={preview}>
        <Image
          width={100}
          height={100}
          src={preview}
          alt={file.name}
          className="h-full w-full scale-100 overflow-hidden rounded-t-[8px] object-cover transition-all duration-300 active:scale-125"
        />
      </ModalImg>
    );
  }

  return IconComponent ? <IconComponent /> : <Doc className="text-dark-blue-focus h-[50px] w-[50px]" />;
};
