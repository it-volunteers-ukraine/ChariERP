import {
  SocialSite,
  SocialPhone,
  SocialGithub,
  SocialBehance,
  SocialDiscord,
  SocialFacebook,
  SocialLinkedin,
  SocialLocation,
  SocialTelegram,
  SocialWhatsapp,
  SocialInstagram,
} from '@/assets/icons';

interface ISocialIconProps {
  keyName: string;
  className?: string;
}

export const SocialIcon = ({ keyName, className }: ISocialIconProps) => {
  const SOCIAL = {
    phone: 'phone',
    github: 'github',
    behance: 'behance',
    discord: 'discord',
    facebook: 'facebook',
    linkedin: 'linkedin',
    telegram: 'telegram',
    location: 'location',
    whatsapp: 'whatsapp',
    instagram: 'instagram',
  };

  switch (keyName.toLowerCase()) {
    case SOCIAL.instagram:
      return <SocialInstagram className={className} />;
    case SOCIAL.linkedin:
      return <SocialLinkedin className={className} />;
    case SOCIAL.facebook:
      return <SocialFacebook className={className} />;
    case SOCIAL.telegram:
      return <SocialTelegram className={className} />;
    case SOCIAL.whatsapp:
      return <SocialWhatsapp className={className} />;
    case SOCIAL.location:
      return <SocialLocation className={className} />;
    case SOCIAL.behance:
      return <SocialBehance className={className} />;
    case SOCIAL.discord:
      return <SocialDiscord className={className} />;
    case SOCIAL.github:
      return <SocialGithub className={className} />;
    case SOCIAL.phone:
      return <SocialPhone className={className} />;
    default:
      return <SocialSite className={className} />;
  }
};
