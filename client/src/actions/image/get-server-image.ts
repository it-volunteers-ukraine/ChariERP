'use server';

import { imageService } from '@/lib';

export async function getImageAction(url: string) {
  try {
    return await imageService.getImage(url);
  } catch (error) {
    return Promise.reject(error);
  }
}
