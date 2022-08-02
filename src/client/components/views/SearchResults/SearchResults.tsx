import styles from './SearchResults.module.scss';
import { useAppSelector } from '../../../redux/hooks';
import { getSearchedUsers } from '../../../redux/slices/postsSlice';
import SearchCard from '../SearchCard/SearchCard';

const SearchResults = ({ query }: { query: string }) => {
  const foundProfiles = useAppSelector((state) => getSearchedUsers(state, query));

  return (
    <div className={styles.hideSearch}>
      <div className={styles.container}>
        {foundProfiles.map(({ username, picture }) => (
          <SearchCard username={username} picture={picture} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
