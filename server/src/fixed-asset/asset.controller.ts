import { Controller, Post, Body, Req } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { AssetResponseDto } from './dto/asset-response.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiCreatedResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { UserRoles } from '../auth/roles.guard';
import { Roles } from '../schemas/enums';
import { AuthenticatedRequest } from './interfaces/authenticated-request.interface';
import { plainToInstance } from 'class-transformer';

@ApiTags('Asset')
@Controller('asset')
@ApiBearerAuth()
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @ApiOperation({ summary: 'Create fixed asset' })
  @ApiCreatedResponse({
    description: 'Fixed asset successfully created',
    type: AssetResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request — validation failed' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({ description: 'Forbidden — user role does not have access to this resource' })
  @Post()
  @UserRoles(Roles.MANAGER)
  async create(@Body() createAssetDto: CreateAssetDto, @Req() req: AuthenticatedRequest): Promise<AssetResponseDto> {
    const userId = req.user.sub;
    
    const asset = await this.assetService.create(createAssetDto, userId);

    return plainToInstance(AssetResponseDto, asset);
  }
}