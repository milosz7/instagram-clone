import styles from './LogoButton.module.scss';
import { useMatch, useNavigate } from 'react-router';
import React from 'react';

const LogoButton = ({children}: {children: React.ReactNode}) => {
  const match = useMatch('/');
  const navigate = useNavigate();
  const manageClick = () => {
    if (match) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      navigate('/')
    }
  };

  return (
    <button type="button" onClick={manageClick} className={styles.logoBtn}>
      {children}
    </button>
  );
};

export default LogoButton;
