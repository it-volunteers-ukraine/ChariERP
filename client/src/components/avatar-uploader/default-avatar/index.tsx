import { Avatar } from '@/assets/icons';

interface DefaultAvatarProps {
  isSubmit?: boolean;
  lastName?: string;
  firstName?: string;
}

export const DefaultAvatar = ({ isSubmit, firstName, lastName }: DefaultAvatarProps) => {
  if (!isSubmit) {
    return <Avatar />;
  }

  return (
    <p className="text-[40px] text-white uppercase">
      {firstName?.[0]}
      {lastName?.[0]}
    </p>
  );
};
