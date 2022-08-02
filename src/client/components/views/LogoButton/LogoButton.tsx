import styles from './LogoButton.module.scss';
import { useMatch, useNavigate } from 'react-router';
import React from 'react';
import { persistor } from '../../../..';
import { useAppDispatch } from '../../../redux/hooks';
import { clearPosts, fetchPostData } from '../../../redux/slices/postsSlice';

const LogoButton = ({ children }: { children: React.ReactNode }) => {
  const match = useMatch('/');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const manageClick = () => {
    if (match && window.scrollY === 0) {
      persistor.purge();
      dispatch(clearPosts());
      dispatch(fetchPostData());
    } else if (match) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      navigate('/');
    }
  };

  return (
    <button type="button" onClick={manageClick} className={styles.logoBtn}>
      {children}
    </button>
  );
};

export default LogoButton;
