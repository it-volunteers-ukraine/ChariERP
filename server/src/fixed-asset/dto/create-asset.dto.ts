import { IAsset } from '../interfaces/asset.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsOptional, IsNumber, IsPositive } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ASSET_NAME_REGEX, ASSET_DATE_REGEX, ASSET_VALUE_REGEX } from '../../constants/regex.constants';
import { VALIDATION_MESSAGES } from '../../constants/validation-messages';

export class CreateAssetDto implements IAsset {
  @ApiProperty({ required: true, example: 'Стіл' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @MinLength(2, { message: VALIDATION_MESSAGES.ASSET.NAME_MIN_LENGTH })
  @MaxLength(100, { message: VALIDATION_MESSAGES.ASSET.NAME_MAX_LENGTH })
  @Matches(ASSET_NAME_REGEX, { message: VALIDATION_MESSAGES.ASSET.NAME_INVALID_CHARACTERS})
  name: string;

  @ApiPropertyOptional({ example: 'Склад 2'})
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: '2'})
  @IsOptional()
  @IsString()
  storageFloor?: string;

  @ApiPropertyOptional({ example: 'Меблі'})
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'Подарунок'})
  @IsOptional()
  @IsString()
  origin?: string;

  @ApiPropertyOptional({ example: 'Voice'})
  @IsOptional()
  @IsString()
  financing?: string;

  @ApiPropertyOptional({ example: '15.07.2025', type: String})
  @IsOptional()
  @Matches(ASSET_DATE_REGEX, { message: VALIDATION_MESSAGES.ASSET.DATE_INVALID})
  dateReceived?: string;

  @ApiPropertyOptional({ example: 3000.50 })
  @IsOptional()
  @Matches(ASSET_VALUE_REGEX, { message: VALIDATION_MESSAGES.ASSET.VALUE_DECIMAL })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  value?: number;

  @ApiPropertyOptional({ example: 'грн' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ example: 'шт' })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({ example: 'https://chari-erp-bucket.s3.eu-central-1.amazonaws.com/fixed-asset-photos/table.jpg' })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiPropertyOptional({ example: 'примітка' })
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @MaxLength(500, { message: VALIDATION_MESSAGES.ASSET.DESC_MAX_LENGTH})
  description?: string;
}