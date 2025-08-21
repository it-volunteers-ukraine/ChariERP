import { Asset } from '../interfaces/asset.interface';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ASSET_NAME_REGEX, ASSET_DATE_REGEX } from '../../constants/regex.constants';
import { VALIDATION_MESSAGES } from '../../constants/validation-messages';

export class CreateAssetDto implements Asset {
  @ApiProperty({ required: true, example: 'Стіл' })
  @IsDefined({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @MinLength(2, { message: VALIDATION_MESSAGES.ASSET.NAME_MIN_LENGTH })
  @MaxLength(100, { message: VALIDATION_MESSAGES.ASSET.NAME_MAX_LENGTH })
  @Matches(ASSET_NAME_REGEX, { message: VALIDATION_MESSAGES.ASSET.NAME_INVALID_CHARACTERS })
  name: string;

  @ApiProperty({ example: 'Склад 2' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: '2' })
  @IsOptional()
  @IsString()
  storageFloor?: string;

  @ApiProperty({ example: 'Меблі' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: 'Подарунок' })
  @IsOptional()
  @IsString()
  origin?: string;

  @ApiProperty({ example: 'Voice' })
  @IsOptional()
  @IsString()
  financing?: string;

  @ApiProperty({ example: '15.07.2025', type: String })
  @IsOptional()
  @Matches(ASSET_DATE_REGEX, { message: VALIDATION_MESSAGES.ASSET.DATE_INVALID })
  dateReceived?: string;

  @ApiProperty({ example: 3000.52 })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  value?: number;

  @ApiProperty({ example: 'грн' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ example: 'шт' })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiProperty({
    example: 'https://chari-erp-bucket.fra1.digitaloceanspaces.com/kyiv/fixed-assets/table.jpg',
    description: 'Valid image URL (.jpg, .jpeg, .png, .webp), max size 5MB',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  photo?: string;

  @ApiProperty({ example: 'примітка' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @MaxLength(500, { message: VALIDATION_MESSAGES.ASSET.DESC_MAX_LENGTH })
  description?: string;
}
