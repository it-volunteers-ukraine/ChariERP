import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AssetResponseDto {
  @ApiProperty({ example: '65f1c7a4e52891827ad41234' })
  @Expose()
  _id: string;

  @ApiProperty({ example: 'Стіл' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'Склад 2' })
  @Expose()
  location?: string;

  @ApiProperty({ example: '2' })
  @Expose()
  storageFloor?: string;

  @ApiProperty({ example: 'Меблі' })
  @Expose()
  category?: string;

  @ApiProperty({ example: 'Подарунок' })
  @Expose()
  origin?: string;

  @ApiProperty({ example: 'Voice' })
  @Expose()
  financing?: string;

  @ApiProperty({ example: '15.07.2025' })
  @Expose()
  dateReceived?: string;

  @ApiProperty({ example: 3000.5 })
  @Expose()
  value?: number;

  @ApiProperty({ example: 'грн' })
  @Expose()
  currency?: string;

  @ApiProperty({ example: 'шт' })
  @Expose()
  unit?: string;

  @ApiProperty({ example: 'https://chari-erp-bucket.s3.eu-central-1.amazonaws.com/fixed-asset-photos/table.jpg' })
  @Expose()
  photo?: string;

  @ApiProperty({ example: 'примітка' })
  @Expose()
  description?: string;

  @ApiProperty({ example: '67eaba1a60eb693f37977d88' })
  @Expose()
  createdBy: string;

  @ApiProperty({ example: '2025-07-21T16:16:43.246+00:00' })
  @Expose()
  createdAt: Date;
}