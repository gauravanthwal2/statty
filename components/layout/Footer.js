import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className="text-center text-secondary">
        Copyright © 2022 Publicis Sapient, Inc. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
