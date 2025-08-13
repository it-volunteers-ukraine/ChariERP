import { Controller, Post, Patch, Body, Req, Get, Delete, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { AssetResponseDto } from './dto/asset-response.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiCreatedResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiForbiddenResponse, ApiOkResponse, ApiNoContentResponse, ApiQuery, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';
import { UserRoles } from '../auth/roles.guard';
import { Roles } from '../schemas/enums';
import { AuthenticatedRequest } from './interfaces/authenticated-request.interface';
import { plainToInstance } from 'class-transformer';
import { PaginationqQuery } from './interfaces/pagination-query.interface';
import { PaginatedAssetDto } from './dto/paginated-asset.dto';

@ApiTags('Asset')
@Controller('assets')
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

  @ApiOperation({ summary: 'Get all fixed assets' })
  @ApiQuery({ name: 'page', required: false, type: 'string', example: '1', description: 'Page number'})
  @ApiQuery({ name: 'limit', required: false, type: 'string', example: '5', description: 'Fixed assets per page'})
  @ApiOkResponse({
    type: PaginatedAssetDto,
    description: 'Get all fixed assets',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiNotFoundResponse({ description: 'No fixed assets found for this user in the organization'})
  @Get()
  async findAll(@Query() query: PaginationqQuery, @Req() req: AuthenticatedRequest): Promise<PaginatedAssetDto> {
    const userId = req.user.sub;

    const { total, assets } = await this.assetService.findAll(userId, query);

    return { total, assets: plainToInstance(AssetResponseDto, assets) };
  }

  @ApiOperation({ summary: 'Update fixed asset' })
  @ApiParam({ name: 'id', description: 'Id of the fixed asset to update', example: '688a2892b0efd21aba86ff39'})
  @ApiOkResponse({
    description: 'Fixed asset successfully updated',
    type: AssetResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request — validation failed' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({ description: 'Forbidden — user role does not have access to this resource' })
  @Patch(':id')
  @UserRoles(Roles.MANAGER)
  async update(@Param('id') assetId: string, @Body() updateAssetDto: CreateAssetDto): Promise<AssetResponseDto> {
    const updatedAsset = await this.assetService.update(updateAssetDto, assetId);

    return plainToInstance(AssetResponseDto, updatedAsset);
  }

  @ApiOperation({ summary: 'Delete fixed asset' })
  @ApiParam({ name: 'id', description: 'Id of the fixed asset to delete', example: '688a2892b0efd21aba86ff39'})
  @ApiNoContentResponse({ description: 'Fixed asset successfully deleted' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({ description: 'Forbidden — user role does not have access to this resource' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UserRoles(Roles.MANAGER)
  async deleteOne(@Param('id') assetId: string): Promise<void> {

    await this.assetService.deleteOne(assetId);
  }
}