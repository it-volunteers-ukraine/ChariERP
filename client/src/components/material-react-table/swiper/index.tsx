'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import { EmptyPhoto } from '@/assets/img';
import { Overlay } from '@/components/overlay';
import { ModalAdmin } from '@/components/modals';
import { Close, Delete, Plus } from '@/assets/icons';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Photo = {
  id: string;
  url: string;
};

type GalleryModalProps = {
  photos: Photo[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAddPhoto: (newPhoto: Photo) => void;
  onDeletePhoto: (photoId: string) => void;
};

export const GalleryModal = ({ photos, isOpen, setIsOpen, onAddPhoto, onDeletePhoto }: GalleryModalProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsOpen(false);
  };

  const handleDelete = (photoId: string) => {
    setSelectedPhotoId(photoId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPhotoId) {
      onDeletePhoto(selectedPhotoId);
      setDeleteModalOpen(false);
      setSelectedPhotoId(null);
    }
  };

  const handleAddPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const newPhoto: Photo = {
        id: Date.now().toString(),
        url: reader.result as string,
      };

      onAddPhoto(newPhoto);
    };
    reader.readAsDataURL(file);

    e.target.value = '';
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay isImg opened={isOpen} onClose={handleClose} classNameModal="!h-[70vh]">
      <button
        className="absolute top-2 right-2 z-40 cursor-pointer rounded p-1 text-white transition hover:scale-125"
        onClick={handleClose}
        aria-label="Close modal"
      >
        <Close className="mx-auto h-6 w-6" />
      </button>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        className="max-h-[70vh] px-4 sm:px-12"
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
      >
        {photos.length > 0 ? (
          photos.map((photo) => (
            <SwiperSlide key={photo.id} className="flex items-center justify-center px-2 lg:px-0">
              <div className="flex h-full w-full items-center justify-center">
                <div className="relative">
                  <Image
                    width={700}
                    height={500}
                    src={photo.url}
                    alt={`galleryPhoto_${photo.id}`}
                    className="w-full rounded-lg object-contain"
                  />

                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="hover:text-red absolute top-[-32px] right-0 rounded p-1 text-white transition hover:scale-110"
                    aria-label="Delete photo"
                  >
                    <Delete className="mx-auto h-6 w-6" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <Image src={EmptyPhoto} alt="Profile" width={85} height={85} className="m-auto object-cover" />
        )}

        <SwiperSlide className="flex h-full w-full items-center justify-center px-2 lg:px-0">
          <div className="flex h-full w-full items-center justify-center">
            <button
              onClick={handleAddPhoto}
              className="flex h-full max-h-[500px] w-full max-w-[700px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-white p-6 text-white transition hover:border-blue-500 hover:text-blue-600"
              aria-label="Add photo"
            >
              <Plus className="mb-2 h-16 w-16" />

              <span className="text-2xl">Додати фото</span>
            </button>
          </div>
        </SwiperSlide>
      </Swiper>

      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

      <ModalAdmin
        isError={false}
        isLoading={false}
        btnCancelText="Ні"
        btnConfirmText="Так"
        isOpen={deleteModalOpen}
        classNameBtn="min-w-[120px]"
        title="Підтвердити видалення"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteModalOpen(false)}
        content="Ви дійсно хочете видалити це фото?"
      />
    </Overlay>
  );
};
