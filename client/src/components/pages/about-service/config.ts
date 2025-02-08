import data from '@/messages/en.json';

import {
  Seo,
  Sales,
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
} from '@/assets/img';

import { generateKey } from './utils';

export interface IBeneficiary {
  texts: string[];
  subTitle: string;
}

const lists = data.aboutService.list;

export const automatization = [
  { img: Transparency, title: 'clarity' },
  { img: Staffing, title: 'automatization' },
  { img: SocialLike, title: 'interaction' },
  { img: Sales, title: 'efficiency' },
  { img: InvoicePaper, title: 'management' },
  { img: Performance, title: 'achieveGoals' },
  { img: Seo, title: 'support' },
];

export const planning = [
  {
    img: BudgetAccounting,
    title: 'financialAccounting',
    texts: generateKey(lists.financialAccounting, 'list.financialAccounting'),
  },
  {
    img: ContactDatabase,
    title: 'contactDatabase',
    texts: generateKey(lists.contactDatabase, 'list.contactDatabase'),
  },
  {
    img: Donations,
    title: 'donationProcessing',
    texts: generateKey(lists.donationProcessing, 'list.donationProcessing'),
  },
  {
    img: ProjectMonitoring,
    title: 'planning',
    texts: generateKey(lists.planning, 'list.planning'),
  },
  {
    img: OrganizationEvents,
    title: 'organizationEvents',
    texts: generateKey(lists.organizationEvents, 'list.organizationEvents'),
  },
  {
    img: AutomaticReporting,
    title: 'reporting',
    texts: generateKey(lists.reporting, 'list.reporting'),
  },
];

export const beneficiary = [
  {
    img: Manager,
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
    img: Volunteers,
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
    img: Sponsors,
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
