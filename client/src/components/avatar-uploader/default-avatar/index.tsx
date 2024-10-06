import { Avatar } from '@/assets/icons';

interface DefaultAvatarProps {
  lastName?: string;
  firstName?: string;
}

export const DefaultAvatar = ({ firstName, lastName }: DefaultAvatarProps) => {
  if (firstName && lastName) {
    return (
      <p className="text-[40px] uppercase text-white">
        {firstName?.[0]}
        {lastName?.[0]}
      </p>
    );
  }

  return <Avatar />;
};
