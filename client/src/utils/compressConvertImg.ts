const availableConvertFormats = ['image/webp', 'image/jpeg', 'image/png', 'image/jpg'];

export type FormatType = 'image/webp' | 'image/jpeg' | 'image/png' | 'image/jpg';

export interface ICompressConvertImage {
  file: File;
  format?: FormatType;
  quality?: number;
}

export const compressConvertImage = ({
  file,
  format = 'image/webp',
  quality = 0.8,
}: ICompressConvertImage): Promise<{ url: string; file: File; blob: Blob }> => {
  return new Promise((resolve, reject) => {
    if (!file) return reject('File not found');
    if (!availableConvertFormats.includes(format)) return reject('Invalid format');

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      if (!e.target || typeof e.target.result !== 'string') {
        return reject(new Error('Error reading image'));
      }

      const img = new Image();

      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');

        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return reject(new Error('Error creating canvas context'));
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const outputType = format;
        const nameFile = file.name?.split('.').slice(0, -1).join('.');
        const extension = format?.split('/')[1];

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const newFile = new File([blob], `${nameFile}.${extension}`, {
                type: outputType,
                lastModified: file.lastModified,
              });

              const previewUrl = URL.createObjectURL(newFile);

              resolve({
                file: newFile,
                url: previewUrl,
                blob,
              });
            } else {
              reject(new Error('Error creating Blob'));
            }
          },
          outputType,
          quality,
        );
      };

      img.onerror = () => reject(new Error('Error loading image'));
    };

    reader.onerror = () => reject(new Error('Error reading image'));
  });
};
