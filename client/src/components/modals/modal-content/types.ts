export interface IModalContent {
  name: string;
  organizationName: string;
  setFieldValue?: (field: string, value: { id: string; value: string }, shouldValidate?: boolean) => void;
}
