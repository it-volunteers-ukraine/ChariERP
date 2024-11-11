import { Email, Facebook, Instagram, Linkedin, Phone, Telegram } from '@/assets/icons';

export interface IMessengerMock {
  link: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const MessengerMock: IMessengerMock[] = [
  {
    icon: Email,
    title: 'email',
    link: 'it.volunteers.ukraine@gmail.com',
  },
  {
    icon: Phone,
    title: 'phone',
    link: '+380 98 347 0035',
  },
  {
    icon: Facebook,
    title: 'facebook',
    link: 'facebook.com/it.volunteers.ukraine',
  },
  {
    icon: Instagram,
    title: 'instagram',
    link: 'instagram.com/it.volunteers.ukraine/',
  },
  {
    icon: Telegram,
    title: 'telegram',
    link: 'it_volunteers',
  },
  {
    icon: Linkedin,
    title: 'linkedin',
    link: 'linkedin.com/company/it-volunteers',
  },
];
