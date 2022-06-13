import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
        <div className={styles.navLayout}>
          <a className={styles.logo} href="/">Fakeinsta</a>
          <div className={styles.iconBox}>
            <i className="fa fa-home"></i>
            <i className={`fa fa-location-arrow ${styles.arrow}`} ></i>
            <i className="fa fa-plus"></i>
            <i className="fa fa-compass"></i>
            <i className="fa fa-heart-o"></i>
          </div>
        </div>
    </nav>
  )
};

export default Navbar;