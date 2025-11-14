import { PartialType } from '@nestjs/swagger';
import { CreateAssetFormData } from './create-asset-form-data';

export class UpdateAssetFormData extends PartialType(CreateAssetFormData) {}
