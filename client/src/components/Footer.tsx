import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 mt-4">
      <p>© 2025 KVM. All rights reserved.</p>

      <div className="flex justify-center space-x-4 mt-2">
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