import { useEffect, useRef } from 'react';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

type Props = {
  imageUrls: string[];
  galleryId: string;
  onDeletePhoto: (urlToDelete: string) => void;
};

export const GalleryImageCell = ({ imageUrls, galleryId, onDeletePhoto }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    Fancybox.bind('[data-fancybox]', {
      on: {
        'Carousel.ready': (fancyboxInstance) => {
          addDeleteButton(fancyboxInstance);
        },
        'Carousel.change': (fancyboxInstance) => {
          addDeleteButton(fancyboxInstance);
        },
        'Carousel.destroy': () => {
          // Очистити кнопку при закритті
          removeDeleteButton();
        },
      },
    });

    function removeDeleteButton() {
      const oldBtn = document.querySelector('.custom-delete-btn');

      if (oldBtn) oldBtn.remove();
    }

    function addDeleteButton(fancyboxInstance: unknown) {
      console.log(fancyboxInstance);

      removeDeleteButton();

      const slide = Fancybox.getSlide();

      if (!slide || !slide.el) return;

      const btn = document.createElement('button');

      btn.innerText = '🗑️';
      btn.className = 'custom-delete-btn';
      Object.assign(btn.style, {
        position: 'absolute',
        top: '100px',
        right: '100px',
        zIndex: '9999',
        background: 'rgba(255,255,255,0.8)',
        border: 'none',
        padding: '5px 8px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '18px',
      });

      btn.onclick = () => {
        if (slide.src) {
          onDeletePhoto(slide.src);
          Fancybox.close();
        }
      };

      slide.el.style.position = 'relative';
      slide.el.appendChild(btn);
      console.log(`Added delete button for slide: ${slide.src}`);
    }

    return () => {
      Fancybox.destroy();
    };
  }, [imageUrls, onDeletePhoto]);

  if (imageUrls.length === 0) return <div>Фото відсутнє</div>;

  return (
    <div ref={ref}>
      <a href={imageUrls[0]} data-fancybox={galleryId} data-caption={`Фото 1`}>
        <img
          src={imageUrls[0]}
          alt="Фото 1"
          style={{ width: '125px', height: '85px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
        />
      </a>

      <div style={{ display: 'none' }}>
        {imageUrls.slice(1).map((url, idx) => (
          <a key={idx + 1} href={url} data-fancybox={galleryId} data-caption={`Фото ${idx + 2}`} />
        ))}
      </div>
    </div>
  );
};
