import { Post } from '../../../redux/slices/postsSlice';
import PostHeader from '../PostHeader/PostHeader';
import PostControls from '../PostControls/PostControls';
import PostInfo from '../PostInfo/PostInfo';
import styles from './PostExpanded.module.scss';

const PostExpanded = ({ id, imageURL, username, picture, desc, likes, isFavorite }: Post) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.postImage} src={imageURL} alt="post content" />
      </div>
      <div className={styles.postInfo}>
        <PostHeader pictureSrc={picture} username={username} />
        <div className={styles.commentBox}></div>
        <PostControls id={id} isFavorite={isFavorite} />
        <PostInfo desc={desc} likes={likes} username={username} />
      </div>
    </div>
  );
};

export default PostExpanded;
