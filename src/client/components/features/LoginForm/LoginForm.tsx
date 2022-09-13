import { useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import styles from './LoginForm.module.scss';
import Button from '../../common/Button/Button';
import AnimatedPasswordInput from '../../common/AnimatedPasswordInput/AnimatedPasswordInput';
import AnimatedInput from '../../common/AnimatedInput/AnimatedInput';

const LoginForm = ({ action }: { action: Dispatch<SetStateAction<boolean>> }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { status } = await axios.post('/auth/login', { username, password });
    setUsername('');
    setPassword('');
    if (status === 200) action(true);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Fakeinsta</h2>
      <div>
        <AnimatedInput placeholder='Username' value={username} setValue={setUsername} />
        <AnimatedPasswordInput placeholder='Password' value={password} setValue={setPassword} />
        <Button type="submit">Log in</Button>
      </div>
    </form>
  );
};

export default LoginForm;
