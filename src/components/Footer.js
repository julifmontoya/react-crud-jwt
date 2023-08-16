import React from "react";
import logoFace from "./logo-face.svg";
import logoInst from "./logo-inst.svg";
import logoYout from "./logo-youtube.svg";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div>
      <div className={styles.footerContainer}>
        <a
          className={`${styles.socialIcon} ${styles.facebook}`}
          href="https://facebook.com/"
          target="_blank"  // Add target="_blank" attribute
          rel="noopener noreferrer" // Add rel attribute for security
          role="button"
        >
          <img src={logoFace} alt="logo" />
        </a>
        <a
          className={`${styles.socialIcon} ${styles.youtube}`}          
          href="https://www.youtube.com/"
          target="_blank"  // Add target="_blank" attribute
          rel="noopener noreferrer" // Add rel attribute for security
          role="button"
        >
          <img src={logoYout} alt="logo" />
        </a>
        <a
          className={`${styles.socialIcon} ${styles.instagram}`}
          href="https://www.instagram.com/"
          target="_blank"  // Add target="_blank" attribute
          rel="noopener noreferrer" // Add rel attribute for security
          role="button"
        >
          <img src={logoInst} alt="logo" />
        </a>
      </div>
      <div className={styles.footerText}>
        <p>© 2023 Copyright:</p>
      </div>
    </div>
  );
};

export default Footer;
