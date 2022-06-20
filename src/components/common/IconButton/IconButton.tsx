import React from 'react';
import styles from './IconButton.module.scss';
import StrokeIcon from '../StrokeIcon/StrokeIcon';

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
      <StrokeIcon icon={icon} />
    </button>
  );
};

export default IconButton;
