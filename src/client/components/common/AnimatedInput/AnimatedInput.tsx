import { useId, Dispatch, SetStateAction } from 'react';
import styles from './AnimatedInput.module.scss';
import clsx from 'clsx';

const AnimatedInput = ({
  value,
  setValue,
  placeholder,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
}) => {
  const inputId = useId();

  return (
    <label htmlFor={inputId} className={styles.label}>
      <span className={clsx(value && styles.active)}>{placeholder}</span>
      <input
        type="text"
        id={inputId}
        value={value}
        autoComplete="off"
        onChange={(e) => setValue(e.target.value)}
        className={clsx(value && styles.active, styles.input)}
      />
    </label>
  );
};

export default AnimatedInput;
