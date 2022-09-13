import Button from '../../common/Button/Button';
import { useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import styles from './Login.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import LoginForm from '../../features/LoginForm/LoginForm';

const Login = ({ action }: { action: Dispatch<SetStateAction<boolean>> }) => {

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <LoginForm action={action} />
        <div className={styles.register}>
          <p>
            You don't have an account?
            <span>
              <Link to="/register"> Register here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
