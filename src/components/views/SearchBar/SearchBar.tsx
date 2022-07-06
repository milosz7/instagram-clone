import styles from './SearchBar.module.scss';
import SearchResults from '../SearchResults/SearchResults';
import { useState } from 'react';

const SearchBar = ({ placeholder }: { placeholder: string }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {isFocused && <SearchResults query={searchQuery} />}
    </div>
  );
};

export default SearchBar;
