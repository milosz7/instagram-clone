import { getFavoritePosts } from '../../../redux/slices/postsSlice';
import { useAppSelector } from '../../../redux/hooks';
import styles from './FavoritesList.module.scss';
import PostMiniature from '../../views/PostMiniature/PostMiniature';
import { Post } from '../../../redux/slices/postsSlice';

const FavoritesList = () => {
  const favoritePosts = useAppSelector(getFavoritePosts);

  if (favoritePosts.length === 0)
    return (
      <div className={styles.noPosts}>
        <h1>You do not have favorite posts!</h1>
        <h2>Like a post first and then go back to favorites.</h2>
      </div>
    );
  return (
    <div>
      <h1 className={styles.header}>Favorite posts</h1>
      <div className={styles.layout}>
        {favoritePosts.map((postData: Post, idx: number) => (
          <PostMiniature key={idx} postData={postData} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
