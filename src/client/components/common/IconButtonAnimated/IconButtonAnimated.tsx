import clsx from 'clsx';
import styles from './IconButtonAnimated.module.scss';

interface Props {
  icon: string;
  isClicked: boolean;
  colorClass: string;
  action: React.MouseEventHandler;
}

const IconButtonAnimated = ({icon, action, isClicked, colorClass}: Props) => {
  return (
    <button onClick={action} type="button" className={styles.iconButton}>
      <i
        className={clsx(isClicked && styles[colorClass], `fa fa-${icon} ${styles.buttonStroke}`)}
      ></i>
    </button>
  );
}

export default IconButtonAnimated;