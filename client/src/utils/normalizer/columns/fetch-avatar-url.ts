import { getImageAction } from '@/actions';
import logger from '@/utils/logger/logger';

const avatarCache = new Map<string, string>();

export const fetchAvatarUrl = async (userId: string, url: string): Promise<string> => {
  if (avatarCache.has(userId)) {
    return avatarCache.get(userId)!;
  }

  try {
    const response = url ? await getImageAction(url) : { success: true, image: '' };

    if (!response.success) {
      throw new Error('Failed to fetch avatar');
    }

    avatarCache.set(userId, response.image || '');

    return response.image || '';
  } catch (error) {
    logger.error(`Error fetching avatar for user ${userId}`, error);

    return '';
  }
};
