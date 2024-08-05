export interface OrganizationFormValues {
  site: string;
  email: string;
  phone: string;
  agree: boolean;
  edrpou: string;
  lastName: string;
  social: string[];
  position: string;
  firstName: string;
  middleName: string;
  organizationName: string;
  certificate: File | string;
  dateOfRegistration: string;
  declineReason:
    | string
    | {
        id: string;
        value: string;
      };
}
