import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} style={styles.button}>
      Logout
    </button>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  button: {
    // position: 'absolute',
    // top: '1rem',
    // right: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default LogoutButton;
