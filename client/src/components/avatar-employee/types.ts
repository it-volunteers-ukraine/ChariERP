import { StaticImageData } from 'next/image';
export interface AvatarProps {
  // TODO: change types when connect load data from server
  src?: StaticImageData | string;
  name: string;
  surname: string;
  className?: string;
  isLoading?: boolean;
}
