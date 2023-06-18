import { FunctionComponent } from "react";

type ProfileLogoProps = {
  href: string;
  imageSrc: string;
  alt: string;
  label?: string;
};

const ProfileLogo: FunctionComponent<ProfileLogoProps> = ({
  label,
  href,
  imageSrc,
  alt,
}) => {
  return (
    <div className="about-profile-logo">
      <a
        className="hashtag"
        rel="noopener noreferrer"
        target="_blank"
        href={href}
      >
        {label}
        <img src={imageSrc} width="28" height="28" alt={alt} />
      </a>
    </div>
  );
};

export default ProfileLogo;
