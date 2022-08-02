import styles from './PostHeader.module.scss';
import { Link } from 'react-router-dom';

const PostHeader = ({ pictureSrc, username }: { pictureSrc: string; username: string }) => {
  return (
    <div className={styles.container}>
      <Link to={`/profile/${username}`}>
        <img className={styles.image} src={pictureSrc} alt="avatar" />
      </Link>
      <Link className={styles.username} to={`/profile/${username}`}>
        {username}
      </Link>
    </div>
  );
};

export default PostHeader;
