import {
  Controller,
  Post,
  Patch,
  Body,
  Req,
  Get,
  Delete,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetResponse } from './dto/asset-response';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiBody,
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
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { plainToInstance } from 'class-transformer';
import { PaginatedAssetResponse } from './dto/paginated-asset-response';
import { ObjectIdValidationPipe } from '../pipes/object-id-validation.pipe';
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '../constants/pagination.constants';
import { FilesInterceptor } from '@nestjs/platform-express';
import { OptionalFileValidationPipe } from '@/pipes/optional-file-validation.pipe';
import type { MulterFile } from '../pipes/interfaces/file-validator.interface';
import { FileStorageService } from '@/file-storage/file-storage.service';
import { FileStoreFolders } from '../schemas/enums';
import { CreateAssetFormData } from './dto/create-asset-form-data';
import { UpdateAssetFormData } from './dto/update-asset-form-data';

@ApiTags('Asset')
@Controller('assets')
@ApiBearerAuth()
export class AssetController {
  constructor(
    private readonly assetService: AssetService,
    private readonly fileStorageService: FileStorageService,
  ) {}

  @ApiOperation({ summary: 'Create fixed asset' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Form data with asset fields and images',
    type: CreateAssetFormData,
  })
  @ApiCreatedResponse({
    description: 'Fixed asset successfully created',
    type: AssetResponse,
  })
  @ApiBadRequestResponse({ description: 'Bad request — validation failed' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({ description: 'User role does not have access to this resource' })
  @ApiConflictResponse({ description: 'Fixed asset with current name already exists' })
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  @UserRoles(Roles.MANAGER)
  async create(
    @UploadedFiles(OptionalFileValidationPipe) images: MulterFile[],
    @Body() createAssetDto: CreateAssetDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<AssetResponse> {
    const userId = req.user.sub;
    const organizationId = req.user.organizationId;

    if (!images || images.length === 0) {
      const asset = await this.assetService.create(createAssetDto, userId, organizationId);

      return plainToInstance(AssetResponse, asset);
    }

    const imagesKeys = await this.fileStorageService.uploadFiles(organizationId, FileStoreFolders.Assets, images);

    const asset = await this.assetService.create(createAssetDto, userId, organizationId, imagesKeys);

    return plainToInstance(AssetResponse, asset);
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
    type: PaginatedAssetResponse,
    description: 'Get all fixed assets',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiNotFoundResponse({ description: 'No fixed assets found in organization' })
  @Get()
  async findAll(
    @Query('page') page: number = DEFAULT_PAGE,
    @Query('limit') limit: number = DEFAULT_LIMIT,
    @Req() req: AuthenticatedRequest,
  ): Promise<PaginatedAssetResponse> {
    const organizationId = req.user.organizationId;

    const { assets, totalDocs, perPage, currentPage, totalPages } = await this.assetService.findAll(
      organizationId,
      page,
      limit,
    );

    return { assets: plainToInstance(AssetResponse, assets), totalDocs, perPage, currentPage, totalPages };
  }

  @ApiOperation({ summary: 'Update fixed asset' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Form data with asset fields and images',
    type: UpdateAssetFormData,
  })
  @ApiParam({ name: 'id', description: 'Id of the fixed asset to update', example: '688a2892b0efd21aba86ff39' })
  @ApiOkResponse({
    description: 'Fixed asset successfully updated',
    type: AssetResponse,
  })
  @ApiBadRequestResponse({ description: 'Bad request — validation failed' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({ description: 'User role does not have access to this resource' })
  @ApiNotFoundResponse({ description: 'Fixed asset not found' })
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  @UserRoles(Roles.MANAGER)
  async update(
    @UploadedFiles(OptionalFileValidationPipe) images: MulterFile[],
    @Param('id', ObjectIdValidationPipe) assetId: string,
    @Body() updateAssetDto: UpdateAssetDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<AssetResponse> {
    const { organizationId } = req.user;

    if (!images || images.length === 0) {
      const updatedAsset = await this.assetService.update(updateAssetDto, assetId);

      return plainToInstance(AssetResponse, updatedAsset);
    }

    const imagesKeys = await this.fileStorageService.uploadFiles(organizationId, FileStoreFolders.Assets, images);

    const updatedAsset = await this.assetService.update(updateAssetDto, assetId, imagesKeys);

    return plainToInstance(AssetResponse, updatedAsset);
  }

  @ApiOperation({ summary: 'Delete fixed asset' })
  @ApiParam({ name: 'id', description: 'Id of the fixed asset to delete', example: '688a2892b0efd21aba86ff39' })
  @ApiNoContentResponse({ description: 'Fixed asset successfully deleted' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiNotFoundResponse({ description: 'Fixed asset not found' })
  @ApiForbiddenResponse({ description: 'User role does not have access to this resource' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UserRoles(Roles.MANAGER)
  async deleteOne(@Param('id', ObjectIdValidationPipe) assetId: string): Promise<void> {
    await this.assetService.deleteOne(assetId);
  }
}
