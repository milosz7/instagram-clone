import styles from './SearchCard.module.scss';
import { Link } from 'react-router-dom';

const SearchCard = ({username, picture}: {username: string, picture: string}) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={picture} alt="avatar" />
      <Link className={styles.bolded} to={`/profile/${username}`}>{username}</Link>
    </div>
  )
}

export default SearchCard;