import { Email, Facebook, Instagram, Linkedin, Phone, Telegram } from '@/assets/icons';

export interface IMessengerMock {
  id: string;
  link: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const MessengerMock: IMessengerMock[] = [
  {
    icon: Email,
    title: 'email',
    link: 'it.volunteers.ukraine@gmail.com',
    id: '1',
  },
  {
    icon: Phone,
    title: 'phone',
    link: '+380 98 347 0035',
    id: '2',
  },
  {
    icon: Facebook,
    title: 'facebook',
    link: 'facebook.com/it/volunteers',
    id: '3',
  },
  {
    icon: Instagram,
    title: 'instagram',
    link: 'it.volunteers.ukraine',
    id: '4',
  },
  {
    icon: Telegram,
    title: 'telegram',
    link: '@it_volunteers',
    id: '5',
  },
  {
    icon: Linkedin,
    title: 'linkedin',
    link: 'linkedin.com/company/it-volunteers',
    id: '6',
  },
];
