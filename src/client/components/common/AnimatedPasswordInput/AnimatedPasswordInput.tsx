import { useId, useState, Dispatch, SetStateAction } from 'react';
import styles from './AnimatedPasswordInput.module.scss';
import clsx from 'clsx';

const AnimatedPasswordInput = ({
  value,
  setValue,
  placeholder
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string
}) => {
  const [pwdInputType, setPwdInputType] = useState<'text' | 'password'>('password');
  const inputId = useId();

  return (
    <label htmlFor={inputId} className={styles.label}>
      <span className={clsx(value && styles.active)}>{placeholder}</span>
      <input
        type="password"
        id={inputId}
        value={value}
        autoComplete="off"
        onChange={(e) => setValue(e.target.value)}
        className={clsx(value && styles.active, styles.input)}
      />
      {value && (
        <button
          type="button"
          className={styles.passwordBtn}
          onClick={() => setPwdInputType(pwdInputType === 'password' ? 'text' : 'password')}
        >
          {pwdInputType === 'password' ? 'Show' : 'Hide'}
        </button>
      )}
    </label>
  );
};

export default AnimatedPasswordInput;
