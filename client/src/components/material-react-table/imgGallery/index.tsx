import { useState } from 'react';

import { GalleryModal } from '../swiper';

type Props = {
  itemId: number;
  photos: { url: string; id: string }[];
  onDeletePhoto: (id: number, photoId: string) => void;
  onAddPhoto: (id: number, photo: { id: string; url: string }) => void;
};

export const GalleryImageCell = ({ photos, itemId, onDeletePhoto, onAddPhoto }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  if (photos.length === 0) return <div>Фото відсутнє</div>;

  return (
    <>
      <img
        src={photos[0].url}
        onClick={() => setIsOpen(true)}
        alt={`galleryPhoto_${photos[0].id}`}
        style={{ width: 125, height: 85, objectFit: 'cover', borderRadius: 4, cursor: 'pointer' }}
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
