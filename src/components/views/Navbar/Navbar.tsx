import styles from './Navbar.module.scss';
import IconButtonAnimated from '../../common/IconButtonAnimated/IconButtonAnimated';
import IconButton from '../../common/IconButton/IconButton';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
        <div className={styles.navLayout}>
          <Link to="/" className={styles.logo}>Fakeinsta</Link>
          <div className={styles.iconBox}>
            <NavLink to="/">
              <IconButton icon="home"/>
            </NavLink>
            <NavLink to="messages">
              <IconButton icon="location-arrow"/>
            </NavLink>
            <NavLink to="add">
              <IconButton icon="plus"/>
            </NavLink>
            <NavLink to="discover">
              <IconButton icon="compass"/>
            </NavLink>
            <NavLink to="favorites">
              <IconButton icon="heart"/>
            </NavLink>
          </div>
        </div>
    </nav>
  )
};

export default Navbar;