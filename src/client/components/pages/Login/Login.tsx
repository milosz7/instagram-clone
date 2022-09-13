import { Dispatch, SetStateAction } from 'react';
import styles from './Login.module.scss';
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
