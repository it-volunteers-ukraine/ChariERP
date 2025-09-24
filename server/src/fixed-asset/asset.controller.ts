import { Controller, Post, Patch, Body, Req, Get, Delete, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetResponseDto } from './dto/asset-response.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiQuery,
  ApiParam,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { UserRoles } from '../auth/roles.guard';
import { Roles } from '../schemas/enums';
import { AuthenticatedRequest } from './interfaces/authenticated-request.interface';
import { plainToInstance } from 'class-transformer';
import { PaginatedAssetResponseDto } from './dto/paginated-asset-response.dto';
import { ValidateObjectIdPipe } from '../pipes/validate-object-id.pipe';
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '../constants/pagination.constants';

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
  @ApiConflictResponse({ description: 'Fixed asset with current name already exists' })
  @Post()
  @UserRoles(Roles.MANAGER)
  async create(@Body() createAssetDto: CreateAssetDto, @Req() req: AuthenticatedRequest): Promise<AssetResponseDto> {
    const userId = req.user.sub;
    const organizationId = req.user.organizationId;

    const asset = await this.assetService.create(createAssetDto, userId, organizationId);

    return plainToInstance(AssetResponseDto, asset);
  }

  @ApiOperation({ summary: 'Get all fixed assets' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'string',
    example: '1',
    description: 'Page number',
    schema: { default: '1' },
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'string',
    example: '5',
    description: 'Fixed assets per page',
    schema: { default: '5' },
  })
  @ApiOkResponse({
    type: PaginatedAssetResponseDto,
    description: 'Get all fixed assets',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiNotFoundResponse({ description: 'No fixed assets found in organization' })
  @Get()
  async findAll(
    @Query('page') page: number = DEFAULT_PAGE,
    @Query('limit') limit: number = DEFAULT_LIMIT,
    @Req() req: AuthenticatedRequest,
  ): Promise<PaginatedAssetResponseDto> {
    const organizationId = req.user.organizationId;

    const { assets, totalDocs, perPage, currentPage, totalPages } = await this.assetService.findAll(
      organizationId,
      page,
      limit,
    );

    return { assets: plainToInstance(AssetResponseDto, assets), totalDocs, perPage, currentPage, totalPages };
  }

  @ApiOperation({ summary: 'Update fixed asset' })
  @ApiParam({ name: 'id', description: 'Id of the fixed asset to update', example: '688a2892b0efd21aba86ff39' })
  @ApiOkResponse({
    description: 'Fixed asset successfully updated',
    type: AssetResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request — validation failed' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({ description: 'Forbidden — user role does not have access to this resource' })
  @ApiNotFoundResponse({ description: 'Fixed asset not found' })
  @Patch(':id')
  @UserRoles(Roles.MANAGER)
  async update(
    @Param('id', ValidateObjectIdPipe) assetId: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ): Promise<AssetResponseDto> {
    const updatedAsset = await this.assetService.update(updateAssetDto, assetId);

    return plainToInstance(AssetResponseDto, updatedAsset);
  }

  @ApiOperation({ summary: 'Delete fixed asset' })
  @ApiParam({ name: 'id', description: 'Id of the fixed asset to delete', example: '688a2892b0efd21aba86ff39' })
  @ApiNoContentResponse({ description: 'Fixed asset successfully deleted' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({ description: 'Forbidden — user role does not have access to this resource' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UserRoles(Roles.MANAGER)
  async deleteOne(@Param('id', ValidateObjectIdPipe) assetId: string): Promise<void> {
    await this.assetService.deleteOne(assetId);
  }
}
