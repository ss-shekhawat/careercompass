import AboutUs from "./landing/AboutUs";
import Advantage from "./landing/Advantage";
import Demo from "./landing/Demo";
import FooterSection from "./landing/FooterSection";
import HeroSection from "./landing/HeroSection";
import Navbar from "./landing/Navbar";
import Program from "./landing/Program";
import Services from "./landing/Services";
// import Teams from "../landing/Teams";

const Home = () => {
  return (
    <div className="w-full primary-font overflow-y-hidden overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Services />
      <Advantage />
      <Program />
      {/* <Teams /> */}
      <AboutUs />
      <Demo />
      <FooterSection />
    </div>
  );
};

export default Home;
