import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import AboutImg from '../assets/homePage.jpg';
import Footer from '../components/Footer';
import EventsPage from '../components/EventsPage';

function Events () {
    return(
      <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={AboutImg}
        title="events "

        btnClass="hide"
      />
      <EventsPage/>
      <Footer/>
    </>
    )
  }
  
  export default Events
;
  