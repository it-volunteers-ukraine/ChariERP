import data from '@/messages/en.json';
import {
  Sales,
  SeoSvg,
  Manager,
  Sponsors,
  Staffing,
  Donations,
  SocialLike,
  Volunteers,
  Performance,
  InvoicePaper,
  Transparency,
  ContactDatabase,
  BudgetAccounting,
  ProjectMonitoring,
  AutomaticReporting,
  OrganizationEvents,
} from '@/assets/icons';

import { generateKey } from './utils';

export interface IBeneficiary {
  subTitle: string;
  texts: string[];
}

const lists = data.aboutService.list;

export const automatization = [
  { Icon: Transparency, title: 'clarity' },
  { Icon: Staffing, title: 'automatization' },
  { Icon: SocialLike, title: 'interaction' },
  { Icon: Sales, title: 'efficiency' },
  { Icon: InvoicePaper, title: 'management' },
  { Icon: Performance, title: 'achieveGoals' },
  { Icon: SeoSvg, title: 'support' },
];

export const planning = [
  {
    Icon: BudgetAccounting,
    title: 'financialAccounting',
    texts: generateKey(lists.financialAccounting, 'list.financialAccounting'),
  },
  {
    Icon: ContactDatabase,
    title: 'contactDatabase',
    texts: generateKey(lists.contactDatabase, 'list.contactDatabase'),
  },
  {
    Icon: Donations,
    title: 'donationProcessing',
    texts: generateKey(lists.donationProcessing, 'list.donationProcessing'),
  },
  {
    Icon: ProjectMonitoring,
    title: 'planning',
    texts: generateKey(lists.planning, 'list.planning'),
  },
  {
    Icon: OrganizationEvents,
    title: 'organizationEvents',
    texts: generateKey(lists.organizationEvents, 'list.organizationEvents'),
  },
  {
    Icon: AutomaticReporting,
    title: 'reporting',
    texts: generateKey(lists.reporting, 'list.reporting'),
  },
];

export const beneficiary = [
  {
    Icon: Manager,
    title: 'managers',
    info: [
      { subTitle: 'management', texts: generateKey(lists.management, 'list.management') },
      { subTitle: 'coordination', texts: generateKey(lists.coordination, 'list.coordination') },
      {
        subTitle: 'reportingAndAnalytics',
        texts: generateKey(lists.reportingAndAnalytics, 'list.reportingAndAnalytics'),
      },
      { subTitle: 'accessManagement', texts: generateKey(lists.accessManagement, 'list.accessManagement') },
      { subTitle: 'strategic', texts: generateKey(lists.strategic, 'list.strategic') },
      { subTitle: 'transparency', texts: generateKey(lists.transparency, 'list.transparency') },
    ],
  },
  {
    Icon: Volunteers,
    title: 'volunteers',
    info: [
      { subTitle: 'office', texts: generateKey(lists.office, 'list.office') },
      {
        subTitle: 'participationProjects',
        texts: generateKey(lists.participationProjects, 'list.participationProjects'),
      },
      {
        subTitle: 'communication',
        texts: generateKey(lists.communication, 'list.communication'),
      },
      { subTitle: 'progress', texts: generateKey(lists.progress, 'list.progress') },
      { subTitle: 'training', texts: generateKey(lists.training, 'list.training') },
      { subTitle: 'interaction', texts: generateKey(lists.interaction, 'list.interaction') },
    ],
  },
  {
    Icon: Sponsors,
    title: 'sponsors',
    info: [
      { subTitle: 'donorAccount', texts: generateKey(lists.donorAccount, 'list.donorAccount') },
      {
        subTitle: 'donations',
        texts: generateKey(lists.donations, 'list.donations'),
      },
      {
        subTitle: 'reportingAndTransparency',
        texts: generateKey(lists.reportingAndTransparency, 'list.reportingAndTransparency'),
      },
      { subTitle: 'informing', texts: generateKey(lists.informing, 'list.informing') },
      { subTitle: 'processAutomation', texts: generateKey(lists.processAutomation, 'list.processAutomation') },
      { subTitle: 'integration', texts: generateKey(lists.integration, 'list.integration') },
    ],
  },
];
