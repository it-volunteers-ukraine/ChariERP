import { updateOrganizationAction, updateOrganizationByManagerAction } from '@/actions';

export const adapterUpdateAction = (isManager: boolean) =>
  isManager ? updateOrganizationByManagerAction : updateOrganizationAction;
