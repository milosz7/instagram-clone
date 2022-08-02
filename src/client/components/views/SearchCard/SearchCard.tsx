import styles from './SearchCard.module.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { setSearch } from '../../../redux/slices/searchSlice';

const SearchCard = ({username, picture}: {username: string, picture: string}) => {
  const dispatch = useAppDispatch();
  
  return (
    <div className={styles.container}>
      <img className={styles.image} src={picture} alt="avatar" />
      <Link className={styles.bolded} onClick={() => dispatch(setSearch(''))} to={`/profile/${username}`}>{username}</Link>
    </div>
  )
}

export default SearchCard;