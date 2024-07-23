import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h1>All Right Reserved &copy; SwiftCart</h1>
      <div className="footer-links">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Footer;
