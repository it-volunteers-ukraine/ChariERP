import { useState } from 'react';
import Image from 'next/image';

import { EmptyPhoto } from '@/assets/img';

import { GalleryModal } from '../swiper';

type Props = {
  itemId: number;
  photos: { url: string; id: string }[];
  onDeletePhoto: (id: number, photoId: string) => void;
  onAddPhoto: (id: number, photo: { id: string; url: string }) => void;
};

export const GalleryImageCell = ({ photos, itemId, onDeletePhoto, onAddPhoto }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasPhotos = photos.length > 0;

  return (
    <>
      <Image
        width={125}
        height={85}
        onClick={() => setIsOpen(true)}
        src={hasPhotos ? photos[0].url : EmptyPhoto}
        className="cursor-pointer rounded-lg object-cover"
        alt={hasPhotos ? `galleryPhoto_${photos[0].id}` : 'Empty Photo'}
      />

      {isOpen && (
        <GalleryModal
          photos={photos}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onDeletePhoto={(photoId) => {
            onDeletePhoto(itemId, photoId);
          }}
          onAddPhoto={(newPhoto) => {
            onAddPhoto(itemId, newPhoto);
          }}
        />
      )}
    </>
  );
};
