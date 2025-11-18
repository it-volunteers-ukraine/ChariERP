import { Asset } from '../interfaces/asset.interfaces';
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
import { Transform, Type } from 'class-transformer';
import { ASSET_NAME_REGEX, ASSET_DATE_REGEX } from '../../constants/regex.constants';
import { VALIDATION_MESSAGES } from '../../constants/validation-messages';
import { BadRequestException } from '@nestjs/common';

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

  @ApiProperty({ example: '15.07.2025' })
  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    if (!value) return undefined;

    if (!ASSET_DATE_REGEX.test(value)) {
      throw new BadRequestException('Asset date must be in the format DD.MM.YYYY');
    }

    const [day, month, year] = value.split('.');
    return new Date(`${year}-${month}-${day}T00:00:00Z`);
  })
  dateReceived?: Date;

  @ApiProperty({ example: 3000.52 })
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
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

  @ApiProperty({ example: 'примітка' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @MaxLength(500, { message: VALIDATION_MESSAGES.ASSET.DESC_MAX_LENGTH })
  description?: string;
}
