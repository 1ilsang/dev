import { FunctionComponent } from "react";
import Image from "next/image";

import ProfileLogo from "./Logo";

import profile from "~data/1ilsang.json";

const ProfileContainer: FunctionComponent = () => {
  return (
    <div className="about-profile-container">
      <div>
        <div className="image-section">
          <div className="image">
            <Image
              className="circle"
              src={profile.profileImage}
              alt={profile.name}
              layout="fill"
            />
          </div>
          <div className="focus-font font-container">
            <div className="wrapper">
              <div className="focus">1ilsang</div>
              <div className="mask">
                <div className="text">1ilsang</div>
              </div>
            </div>
          </div>
        </div>
        <div className="description">
          I don&apos;t want to work hard. I just want to have fun.
        </div>
      </div>
      <div className="about-profile-logo-container">
        <ProfileLogo
          label="1ilsang.dev"
          href="https://1ilsang.dev"
          imageSrc="https://1ilsang.dev/favicon/favicon-32x32.png"
          alt="website logo"
        />
        <ProfileLogo
          label="github.com/1ilsang"
          href="https://github.com/1ilsang"
          imageSrc="https://github.com/1ilsang/dev/assets/23524849/f642699a-c399-4b97-b4a2-15ba5e2dc42b"
          alt="github logo"
        />
        <ProfileLogo
          label="1ilsangc@gmail.com"
          href="https://github.com/1ilsang"
          imageSrc="https://github.com/1ilsang/dev/assets/23524849/51366e8c-b02b-407e-a773-7b90223bd564"
          alt="gmail logo"
        />
        <ProfileLogo
          label="linkedin"
          href="https://www.linkedin.com/in/sang-chul-lee-91a32b154"
          imageSrc="https://github.com/1ilsang/dev/assets/23524849/7e25b27b-1bb1-494d-874d-781db48bb988"
          alt="linked-in logo"
        />
      </div>
    </div>
  );
};

export default ProfileContainer;
