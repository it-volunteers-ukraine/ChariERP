export interface OrganizationFormValues {
  firstName: string;
  site: string;
  email: string;
  phone: string;
  agree: boolean;
  lastName: string;
  middleName: string;
  social: string[];
  organizationName: string;
  position: string;
  edrpou: string;
  certificate: FileList | null;
  dateOfRegistration: string;
  declineReason:
    | string
    | {
        id: string;
        value: string;
      };
}
