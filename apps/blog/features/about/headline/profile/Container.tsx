import { FunctionComponent } from "react";

import ProfileLogo from "./Logo";

import profile from "~data/1ilsang.json";
import { profileLinks } from "~data/profile";

const ProfileContainer: FunctionComponent = () => {
  return (
    <div className="about-profile-container">
      <div>
        <div className="image-section">
          <img
            className="image"
            src={profile.profileImage}
            alt={profile.name}
          />
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
        {profileLinks.map((link) => (
          <ProfileLogo key={link.label} {...link} />
        ))}
      </div>
    </div>
  );
};

export default ProfileContainer;
