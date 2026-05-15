import AboutUs from "./landing Page/AboutUs";
import Advantage from "./landing Page/Advantage";
import Demo from "./landing Page/Demo";
import FooterSection from "./landing Page/FooterSection";
import HeroSection from "./landing Page/HeroSection";
import Navbar from "./landing Page/Navbar";
import Program from "./landing Page/Program";
import Services from "./landing Page/Services";
// import Teams from "../landing Page/Teams";

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
