import React, {memo} from 'react';
// @ts-ignore
import styles from './Footer.module.css';

const Footer = memo(() => (
  <footer className={styles.footer}>
    <p className={styles.title}>Xit Corperation</p>
  </footer>
));

export default Footer;
