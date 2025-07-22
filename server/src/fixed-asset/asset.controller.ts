import { Controller, Post, Body } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { AssetResponseDto } from './dto/asset-response.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@ApiTags('Asset')
@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @ApiOperation({ summary: 'Create fixed asset' })
  @ApiCreatedResponse({
    description: 'Fixed asset successfully created',
    type: AssetResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request — validation failed' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @Post()
  async create(@Body() createAssetDto: CreateAssetDto): Promise<AssetResponseDto> {
    const asset = await this.assetService.create(createAssetDto);

    return plainToInstance(AssetResponseDto, asset, {
      excludeExtraneousValues: false,
    });
  }
}