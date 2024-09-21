import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import AboutImg from '../assets/homePage.jpg';
import Footer from '../components/Footer';
import Member from '../components/member';
function Membership () {
    return(
      <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={AboutImg}
        title= "Membership"
        
      />
      <Member/>
      <Footer/>
    </>
    )
  }
  
  export default Membership;
  