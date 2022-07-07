import styles from './SearchBar.module.scss';
import SearchResults from '../SearchResults/SearchResults';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { getSearchQuery, setSearch } from '../../../redux/slices/searchSlice';

const SearchBar = ({ placeholder }: { placeholder: string }) => {
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(getSearchQuery);

  return (
    <div className={styles.layout}>
      <input
        type="text"
        onBlur={() => setTimeout(() => {
          setIsFocused(false)
        }, 150)}
        onFocus={() => setIsFocused(true)}
        className={styles.input}
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      {isFocused && <SearchResults query={searchQuery} />}
    </div>
  );
};

export default SearchBar;
