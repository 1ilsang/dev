import { NextPage } from "next";
import Navbar from "../components/common/Navbar";

const Home: NextPage = () => {
  return (
    <div className="home-container">
      <Navbar />
      <section className="home-logo scroll-snap" />
      <section className="home-logo2 scroll-snap" />
      <section className="home-logo scroll-snap" />
    </div>
  );
};
export default Home;
