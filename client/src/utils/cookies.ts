import Cookies from 'js-cookie';

import { boardState, idUser } from '@/constants';

export const clearUserCookies = () => {
  Cookies.remove(idUser);
  Cookies.remove(boardState);
};
