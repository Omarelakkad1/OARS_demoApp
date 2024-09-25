import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import AboutImg from '../assets/homePage.jpg';
import Footer from '../components/Footer';
import Timeline from '../components/Timeline';

function Roadmap() {
    return (
      <>
        <Navbar />
        <Hero
          cName="hero-mid"
          heroImg={AboutImg}
          title="Roadmap of OARS"
  
          btnClass="hide"
        />
        <Timeline/>
        <Footer/>
      </>
    );
  }
  
  export default Roadmap;