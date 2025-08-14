import { ApiProperty } from '@nestjs/swagger';
import { AssetResponseDto } from './asset-response.dto';

export class PaginatedAssetDto {
    @ApiProperty({ example: 10, description: 'Total number of fixed assets found' })
    total: number;

    @ApiProperty()
    assets: AssetResponseDto[];
}