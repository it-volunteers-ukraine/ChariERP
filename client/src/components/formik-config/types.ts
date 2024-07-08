export interface OrganizationFormValues {
  name: string;
  site: string;
  email: string;
  phone: string;
  agree: boolean;
  lastName: string;
  middleName: string;
  socialNetworks: string[];
  organizationName: string;
  positionOrganization: string;
  organizationTaxNumber: string;
  certificateOfRegister: string;
  dateOfRegisterOrganization: string;
  rejectReason:
    | string
    | {
        id: string;
        value: string;
      };
}
