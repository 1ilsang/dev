import Link from "next/link";
import { FunctionComponent } from "react";
import { AvatarImage } from "./Avatar";

interface NavTextProps {
  text: string;
  link: string;
  logo?: boolean;
}

const NavText: FunctionComponent<NavTextProps> = ({
  text,
  link,
  logo = false,
}) => {
  return (
    <h2
      className={`${
        logo ? "text-2xl font-bold mt-2 mb-2 ml-3.5" : "text-xl mt-2.5 mr-6"
      } tracking-tight focus:text-gray-700 `}
    >
      <Link href={`${link}`}>
        <a className="hover-underline">{text}</a>
      </Link>
    </h2>
  );
};

const Navbar = () => {
  return (
    <nav className="flex-wrap shadow-lg water-rainbow nav">
      <NavText logo text="1ilsang" link="/" />
      <div className="flex">
        <NavText text="posts" link="/posts" />
        <NavText text="tags" link="/tags" />
        <AvatarImage nav />
      </div>
    </nav>
  );
};

export default Navbar;
