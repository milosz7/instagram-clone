import styles from './SearchBar.module.scss';

const SearchBar = ({ placeholder }: {placeholder: string}) => {
  return <input className={styles.input} placeholder={placeholder}></input>
}

export default SearchBar;