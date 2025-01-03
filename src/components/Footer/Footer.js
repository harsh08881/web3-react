import React from 'react';
import './footer.css'; // Make sure to import the CSS file for styling

const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`footer ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="footer-content">
        <p>&copy; 2025 My Website. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
