export interface OrganizationFormValues {
  name: string;
  site: string;
  email: string;
  phone: string;
  agree: boolean;
  lastName: string;
  password: string;
  middleName: string;
  avatar: File | null;
  socialNetworks: string[];
  organizationName: string;
  positionOrganization: string;
  organizationTaxNumber: string;
  certificateOfRegister: string;
  dateOfRegisterOrganization: string;
  declineReason:
    | string
    | {
        id: string;
        value: string;
      };
}
