import React from 'react';
import LogoutButton from './LogoutButton';
import styles from '../css/Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div>
        {/* Add any additional navigation items or branding here */}
      </div>
      <div>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
