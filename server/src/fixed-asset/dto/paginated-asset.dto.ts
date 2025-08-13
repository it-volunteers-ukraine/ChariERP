import { ApiProperty } from '@nestjs/swagger';
import { AssetResponseDto } from './asset-response.dto';

export class PaginatedAssetDto {
    @ApiProperty({ example: 10 })
    total: number;

    @ApiProperty()
    assets: AssetResponseDto[];
}