import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.nav}>
        <div className={styles.navLayout}>
          <a className={styles.logo} href="/">Fakeinsta</a>
          <div className={styles.iconBox}>
            <i className="fa fa-home"></i>
            <i className="fa fa-location-arrow"></i>
            <i className="fa fa-plus"></i>
            <i className="fa fa-compass"></i>
            <i className="fa fa-heart"></i>
          </div>
        </div>
    </nav>
  )
};

export default Navbar;