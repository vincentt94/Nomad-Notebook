import { Link } from "react-router-dom";
import "../utils/index.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <p>© 2025 KVM. All Rights Reserved.</p>

      <div className="footer">
        <Link to="/">
          Home
        </Link>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" >
          Instagram
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" >
          Facebook
        </a>
        <a href="https://x.com/?lang=en" target="_blank" rel="noopener noreferrer">
          Twitter 
        </a>
      </div>
    </footer>
  );
}