import { FunctionComponent } from 'react';

type LogoProps = {
  href: string;
  logoUrl: string;
  alt: string;
  border?: boolean;
};

const Logo: FunctionComponent<LogoProps> = ({
  href,
  logoUrl,
  alt,
  border = true,
}) => {
  return (
    <div>
      <a
        className="hashtag"
        rel="noopener noreferrer"
        target="_blank"
        href={href}
      >
        <img
          className={`logo${border ? ' border' : ''} loading`}
          src={logoUrl}
          width="124"
          height="124"
          alt={alt}
        />
      </a>
    </div>
  );
};

export default Logo;
