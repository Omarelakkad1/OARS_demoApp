import "./FooterStyles.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="logo-section">
          <h1>OARS</h1>
          <p>Outdoor Activities and Recreational Society</p>
        </div>
        <div className="social-icons">
          <a href="https://m.facebook.com/groups/oarsmmucyber/">
            <i className="fa-brands fa-facebook-square"></i>
          </a>
          <a href="https://www.instagram.com/oarsmmucyber">
            <i className="fa-brands fa-instagram-square"></i>
          </a>
          <a href="https://t.me/oarsmmucyber">
            <i className="fa-brands fa-telegram"></i> {/* Telegram icon */}
          </a>
          <a href="https://discord.com/invite/aQCVsUWYp3">
            <i className="fa-brands fa-discord"></i> {/* Discord icon */}
          </a>
        </div>
      </div>

      <div className="bottom">
        <div>
          <h4>Projects</h4>
          <a href="/">Changelog</a>
          <a href="/">Roadmap</a>
          <a href="/">Community</a>
          <a href="/support">Support</a>
        </div>
        <div>
          <h4>About Us</h4>
          <a href="/about">Our Story</a>
          <a href="/">Team</a>
          <a href="/">Careers</a>
          <a href="/contact">Contact</a>
        </div>
        <div>
          <h4>Follow Us</h4>
          <a href="https://m.facebook.com/groups/oarsmmucyber/">Facebook</a>
          <a href="https://www.instagram.com/oarsmmucyber">Instagram</a>
          <a href="https://t.me/oarsmmucyber">Telegram</a>
          <a href="https://discord.com/invite/aQCVsUWYp3">Discord</a>
        </div>
        <div>
          <h4>Legal</h4>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms of Service</a>
          <a href="/">Cookies Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
