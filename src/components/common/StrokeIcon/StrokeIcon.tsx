import styles from './StrokeIcon.module.scss';

const StrokeIcon = ({ icon }: {icon: string}) => {
  return (
    <i className={`fa fa-${icon} ${styles.stroke}`}></i>
  )
}

export default StrokeIcon;