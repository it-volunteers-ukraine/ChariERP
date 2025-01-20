import Image from 'next/image';

import { Doc } from '@/assets/icons';

import { icon } from './mock';
import { RenderFileProps } from './types';

export const RenderFile = ({ file, preview }: RenderFileProps) => {
  const fileExtension = file.type.split('/').pop();
  const IconComponent = icon[fileExtension as keyof typeof icon];

  if (file.type.startsWith('image/') && preview) {
    return (
      <Image
        width={100}
        height={100}
        src={preview}
        alt={file.name}
        className="h-full w-full rounded-t-[8px] object-cover"
      />
    );
  }

  return IconComponent ? <IconComponent /> : <Doc className="h-[50px] w-[50px] text-darkBlueFocus" />;
};
