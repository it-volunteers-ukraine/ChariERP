import {
  Analytics,
  Communication,
  ProcessControl,
  FinancialManagement,
  MembershipAndParticipation,
} from '../../assets/icons';

export const cardsData = (text: (key: string) => string) => [
  {
    icon: ProcessControl,
    text: text('buttons.firstButtonText'),
  },
  {
    icon: MembershipAndParticipation,
    text: text('buttons.secondButtonText'),
  },
  {
    icon: Analytics,
    text: text('buttons.thirdButtonText'),
  },
  {
    icon: Communication,
    text: text('buttons.fourButtonText'),
  },
  {
    icon: FinancialManagement,
    text: text('buttons.fiveButtonText'),
  },
];
