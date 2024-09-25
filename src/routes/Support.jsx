import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import AboutImg from '../assets/homePage.jpg';
import Footer from '../components/Footer';
import SupportUs from '../components/SupportUs';

function Support() {
    return (
      <>
        <Navbar />
        <Hero
          cName="hero-mid"
          heroImg={AboutImg}
          title="Support Us "
  
          btnClass="hide"
        />
        <SupportUs/>
        <Footer/>
      </>
    );
  }
  
  export default Support;