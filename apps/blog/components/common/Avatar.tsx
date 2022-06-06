import profile from "../../_data/1ilsang.json";
import Image from "next/image";
import Link from "next/link";

export const AvatarImage = () => {
  return (
    <div className="w-12 h-12 rounded-full mr-2 relative">
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
      <div className="text-xl font-medium">
        {profile.name}
        <div className="text-sm text-slate-700 dark:text-slate-500">
          {profile.description}
        </div>
      </div>
    </div>
  );
};

export default Avatar;
