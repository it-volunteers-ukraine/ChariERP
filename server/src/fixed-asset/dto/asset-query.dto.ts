import { ApiProperty } from '@nestjs/swagger';
import { SortOrder, ValueRange } from '../enums/enums';
import { IsOptional, IsNumber, IsEnum, IsString, IsBoolean } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '../../constants/pagination.constants';

export class AssetQueryDto {
  @ApiProperty({
    description: 'Page number',
    default: DEFAULT_PAGE,
    example: '1',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiProperty({
    description: 'Fixed assets per page',
    default: DEFAULT_LIMIT,
    example: '5',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @ApiProperty({
    description: 'Sort by name (asc - A to Z, desc - Z to A)',
    enum: SortOrder,
    example: SortOrder.Ascending,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  name?: SortOrder;

  @ApiProperty({
    description: 'Sort by value (asc - lowest first, desc - highest first)',
    enum: SortOrder,
    example: SortOrder.Descending,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  value?: SortOrder;

  @ApiProperty({
    description: 'Filter by category',
    example: 'Меблі',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'Filter by location',
    example: 'Склад 2',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: 'Filter by image availability (true - has image, false - no image)',
    example: 'Склад 2',
  })
  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  @IsBoolean()
  hasImage?: boolean;

  @ApiProperty({
    description: `Filter by value range (lt1000 - less than 1000, 1000-2000 - inclusive, gt2000 - greater than 2000).`,
    example: ValueRange.BETWEEN_1000_2000,
  })
  @IsOptional()
  @IsEnum(ValueRange)
  valueRange?: ValueRange;
}
