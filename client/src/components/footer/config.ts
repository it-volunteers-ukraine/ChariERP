import { EmailSocial, FacebookSocial, InstagramSocial } from '@/assets/icons';
import { routes } from '@/constants';

export interface ISocial {
  id: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
}

const social: ISocial[] = [
  {
    id: '1',
    Icon: FacebookSocial,
    link: 'https://facebook.com/it/volunteers',
  },
  {
    id: '2',
    Icon: InstagramSocial,
    link: 'https://www.instagram.com/it.volunteers.ukraine/',
  },
  {
    id: '3',
    Icon: EmailSocial,
    link: 'it.volunteers.ukraine@gmail.com',
  },
];

export interface INavigate {
  id: string;
  link: string;
  title: string;
}

const navigate: INavigate[] = [
  {
    id: '1',
    link: routes.aboutUs,
    title: 'aboutUs',
  },
  {
    id: '2',
    link: routes.aboutService,
    title: 'aboutService',
  },
  {
    id: '3',
    link: routes.faq,
    title: 'faq',
  },
  {
    id: '4',
    link: routes.contacts,
    title: 'contacts',
  },
];

export interface IConfigFooter {
  social: ISocial[];
  navigate: INavigate[];
}

export const config: IConfigFooter = {
  social: social,
  navigate: navigate,
};
