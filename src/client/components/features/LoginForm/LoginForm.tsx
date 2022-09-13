import { useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import styles from './LoginForm.module.scss';
import Button from '../../common/Button/Button';

const LoginForm = ({ action }: { action: Dispatch<SetStateAction<boolean>> }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pwdInputType, setPwdInputType] = useState<'text' | 'password'>('password');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data }: { data: { logged: boolean }; status: number } = await axios.post(
      '/auth/login',
      { username, password }
    );
    setUsername('');
    setPassword('');
    action(data.logged);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Fakeinsta</h2>
      <div>
        <label htmlFor="username" className={styles.label}>
          <span className={clsx(username && styles.active)}>Username</span>
          <input
            type="text"
            id="username"
            value={username}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            className={clsx(username && styles.active, styles.input)}
          />
        </label>
        <label htmlFor="password" className={styles.label}>
          <span className={clsx(password && styles.active)}>Password</span>
          <input
            type={pwdInputType}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={clsx(password && styles.active, styles.input)}
          />
          {password && (
            <button
              type="button"
              className={styles.passwordBtn}
              onClick={() => setPwdInputType(pwdInputType === 'password' ? 'text' : 'password')}
            >
              {pwdInputType === 'password' ? 'Show' : 'Hide'}
            </button>
          )}
        </label>
        <Button type="submit">Log in</Button>
      </div>
    </form>
  );
};

export default LoginForm;