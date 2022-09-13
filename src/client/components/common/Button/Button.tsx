import React from "react";
import styles from './Button.module.scss';

const Button = ({children, type}: {children: React.ReactNode, type: 'button' | 'submit' | 'reset'}) => {
  return (
    <button type={type} className={styles.button}>{children}</button>
  )
}

export default Button;