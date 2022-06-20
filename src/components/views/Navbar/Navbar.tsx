import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import StrokeIcon from '../../common/StrokeIcon/StrokeIcon';
import LogoButton from '../LogoButton/LogoButton';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
        <div className={styles.navLayout}>
          <LogoButton>Fakeinsta</LogoButton>
          <div className={styles.iconBox}>
            <NavLink to="/">
              <StrokeIcon icon="home"/>
            </NavLink>
            <NavLink to="messages">
              <StrokeIcon icon="location-arrow"/>
            </NavLink>
            <NavLink to="add">
              <StrokeIcon icon="plus"/>
            </NavLink>
            <NavLink to="discover">
              <StrokeIcon icon="compass"/>
            </NavLink>
            <NavLink to="favorites">
              <StrokeIcon icon="heart"/>
            </NavLink>
          </div>
        </div>
    </nav>
  )
};

export default Navbar;