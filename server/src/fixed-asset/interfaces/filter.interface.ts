export interface Filter {
  organizationId: { $eq: string };
  category?: string;
  location?: string;
  images?: { $exists: boolean };
  value?: { $lt?: number; $gte?: number; $lte?: number; $gt?: number };
}
