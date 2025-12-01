import { ApiProperty } from '@nestjs/swagger';
import { CreateAssetDto } from './create-asset.dto';
import { FILE_VALIDATION } from '@/constants/file-storage.constants';

export class CreateAssetFormData extends CreateAssetDto {
  @ApiProperty({
    description: `Images of the fixed asset to upload.\n
      Allowed images types: ${FILE_VALIDATION.ALLOWED_TYPES.join(', ')}.\n
      Maximum size per image: ${Math.round(FILE_VALIDATION.MAX_SIZE / 1024 / 1024)} MB.\n
      Maximum number of images: ${FILE_VALIDATION.MAX_FILES}.`,
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  images?: any[];
}
