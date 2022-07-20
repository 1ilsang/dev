import Image from "next/image";
import Link from "next/link";

import profile from "../../_data/1ilsang.json";

export const AvatarImage = ({ nav = false }) => {
  return (
    <div
      className={`${
        nav ? "nav-avatar" : "avatar-image"
      } rounded-full mr-2 relative`}
    >
      <Link href="/about">
        <a>
          <Image
            src={profile.profileImage}
            layout="fill"
            objectFit="cover"
            priority
            alt={profile.name}
          />
        </a>
      </Link>
    </div>
  );
};

const Avatar = () => {
  return (
    <div className="flex items-center">
      <AvatarImage />
      <div>
        <Link href="/about">
          <a className="avatar-name">{profile.name}</a>
        </Link>
        <div className="avatar-description">{profile.description}</div>
      </div>
    </div>
  );
};

export default Avatar;
