import { ApiProperty } from '@nestjs/swagger';
import { AssetResponseDto } from './asset-response.dto';

export class PaginatedAssetResponseDto {
  @ApiProperty()
  assets: AssetResponseDto[];

  @ApiProperty({ example: 20, description: 'Total number of documents in collection that match a query' })
  totalDocs: number;

  @ApiProperty({ example: 5, description: 'Limit documents per page' })
  perPage: number;

  @ApiProperty({ example: 1, description: 'Current page number' })
  currentPage: number;

  @ApiProperty({ example: 4, description: 'Total number of pages' })
  totalPages: number;
}
