import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../css/LogoutButton.module.css';

const LogoutButton = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleLogout = () => {
    cookies.remove('authToken', { path: '/' });
    navigate('/login');
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout} title="Logout">
      <FontAwesomeIcon icon={faSignOutAlt} />
    </button>
  );
};

export default LogoutButton;
