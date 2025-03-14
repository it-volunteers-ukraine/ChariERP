import { routes } from '@/constants';
import { EmailSocial, FacebookSocial, InstagramSocial } from '@/assets/icons';

import { INavigate, ISocial, IConfigFooter } from './types';

const social: ISocial[] = [
  {
    name: 'facebook',
    Icon: FacebookSocial,
    link: 'https://facebook.com/it.volunteers.ukraine',
  },
  {
    name: 'instagram',
    Icon: InstagramSocial,
    link: 'https://www.instagram.com/it.volunteers.ukraine/',
  },
  {
    name: 'email',
    Icon: EmailSocial,
    link: 'it.volunteers.ukraine@gmail.com',
  },
];

const navigate: INavigate[] = [
  {
    link: routes.aboutUs,
    title: 'aboutUs',
  },
  {
    link: routes.aboutService,
    title: 'aboutService',
  },
  {
    link: routes.faq,
    title: 'faq',
  },
  {
    link: routes.contacts,
    title: 'contacts',
  },
];

export const config: IConfigFooter = {
  social: social,
  navigate: navigate,
};
