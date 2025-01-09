import { downloadFileFromBucket } from '@/services';
import { getExtensionForBase64, streamToBase64 } from '@/utils';

import { Readable } from 'stream';

export class ImageService {
  async getImage(url: string) {
    if (!url) {
      return { success: false, message: 'Url is required' };
    }

    try {
      const response = await downloadFileFromBucket(url);

      if (!response) {
        return { success: false, message: 'Can`t download image' };
      }

      const extension = getExtensionForBase64(url);
      const image = await streamToBase64(response as Readable);

      return {
        success: true,
        image: `data:${extension};base64,${image}`,
        imageName: url.split('/').pop(),
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export const imageService = new ImageService();
