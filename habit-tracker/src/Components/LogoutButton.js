import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const LogoutButton = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleLogout = () => {
    cookies.remove('authToken', { path: '/' });
    navigate('/login');
  };

  return (
    <button
      className="bg-rose-300 text-white px-3 py-1 rounded hover:bg-rose-400 focus:outline-none"
      onClick={handleLogout}
      title="Logout"
    >
      <FontAwesomeIcon icon={faSignOutAlt} />
    </button>
  );
};

export default LogoutButton;
