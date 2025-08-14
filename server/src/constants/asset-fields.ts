export const ASSET_ALLOWED_FIELDS = [
  'name',
  'location',
  'storageFloor',
  'category',
  'origin',
  'financing',
  'dateReceived',
  'value',
  'currency',
  'unit',
  'photo',
  'description',
] as const;

export type AssetAllowedField = typeof ASSET_ALLOWED_FIELDS[number];