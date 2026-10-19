import FooterBackground from './footer-background';

export default function Home() {
  return (
    <footer className="footer" aria-label="Footer">
      <FooterBackground />
      <div className="jobs">
        <span className="tag">have a fresh idea?</span>
        <span className="headline job-title">gaming on<br />Ultra</span>
        <div className="footer-nav">
          <span>Made</span>
          <span>Story</span>
          <span>In the lab</span>
          <span>Say hey</span>
        </div>
      </div>
      <div className="logo" role="img" aria-label="none logo">
        <span className="brand-wordmark">none</span>
      </div>
      <div className="contact">
        <span className="tag">say hey</span>
        <div className="headline contact-links">
          <span>gaming on</span>
          <span>Discord</span>
        </div>
        <p className="note">*good things start with one spark. let’s make yours.</p>
        <div className="socials">
          <span aria-label="Telegram"><img src="/telegram.svg" alt="" width="35" height="35" /></span>
          <span aria-label="Twitter/X"><img src="/twitter.svg" alt="" width="35" height="35" /></span>
        </div>
      </div>
    </footer>
  );
}
