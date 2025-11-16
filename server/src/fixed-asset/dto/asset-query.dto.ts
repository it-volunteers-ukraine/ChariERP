import { ApiProperty } from '@nestjs/swagger';
import { SortOrder } from '../enums/enums';
import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
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
    description: 'Sort by name',
    enum: SortOrder,
    example: SortOrder.Ascending,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  name?: SortOrder;

  @ApiProperty({
    description: 'Sort by value',
    enum: SortOrder,
    example: SortOrder.Descending,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  value?: SortOrder;
}
