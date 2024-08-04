import { Avatar } from '@/assets/icons';

interface DefaultAvatarProps {
  withAbb?: boolean;
  lastName?: string;
  firstName?: string;
}

export const DefaultAvatar = ({ withAbb, firstName, lastName }: DefaultAvatarProps) => {
  if (!withAbb) {
    return <Avatar />;
  }

  return (
    <p>
      {firstName?.[0]} {lastName?.[0]}
    </p>
  );
};
