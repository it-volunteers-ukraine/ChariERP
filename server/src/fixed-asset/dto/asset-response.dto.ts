import { ApiProperty } from '@nestjs/swagger';

export class AssetResponseDto {
  @ApiProperty({ example: '65f1c7a4e52891827ad41234' })
  _id: string;

  @ApiProperty({ example: 'Стіл' })
  name: string;

  @ApiProperty({ example: 'Склад 2' })
  location?: string;

  @ApiProperty({ example: '2' })
  storageFloor?: string;

  @ApiProperty({ example: 'Меблі' })
  category?: string;

  @ApiProperty({ example: 'Подарунок' })
  origin?: string;

  @ApiProperty({ example: 'Voice' })
  financing?: string;

  @ApiProperty({ example: '15.07.2025' })
  dateReceived?: string;

  @ApiProperty({ example: 3000.5 })
  value?: number;

  @ApiProperty({ example: 'грн' })
  currency?: string;

  @ApiProperty({ example: 'шт' })
  unit?: string;

  @ApiProperty({ example: 'https://chari-erp-bucket.s3.eu-central-1.amazonaws.com/fixed-asset-photos/table.jpg' })
  photo?: string;

  @ApiProperty({ example: 'примітка' })
  description?: string;

  @ApiProperty({ example: '67eaba1a60eb693f37977d88' })
  createdBy: string;

  @ApiProperty({ example: '2025-07-21T16:16:43.246+00:00' })
  createdAt: Date;

  @ApiProperty({ example: '2025-07-21T16:16:43.246+00:00' })
  updatedAt: Date;
}