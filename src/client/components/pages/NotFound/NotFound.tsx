import styles from './NotFound.module.scss';
import Button from '../../common/Button/Button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className={styles.contentBox}>
      <h1>The page you were looking for does not exist!</h1>
      <Link to="/">
        <Button type="button">Return to homepage</Button>
      </Link>
    </div>
  );
};

export default NotFound;
