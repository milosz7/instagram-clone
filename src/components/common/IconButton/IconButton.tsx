import React from 'react';
import styles from './IconButton.module.scss';

const IconButton = ({
  icon,
  isClicked,
  colorClass,
  action,
}: {
  icon: string;
  isClicked?: boolean;
  colorClass?: string;
  action?: React.MouseEventHandler;
}) => {
  return (
    <button type="button" className={styles.iconButton}>
      <i className={`fa fa-${icon} ${styles.buttonStroke}`}></i>
    </button>
  );
};

export default IconButton;
