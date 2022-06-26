import { useParams, useNavigate } from 'react-router';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import styles from './PostModal.module.scss';
import { useAppSelector } from '../../../redux/hooks';
import { getPostById } from '../../../redux/slices/postsSlice';
import PostHeader from '../PostHeader/PostHeader';
import PostControls from '../PostControls/PostControls';
import PostInfo from '../PostInfo/PostInfo';

const PostModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postData = useAppSelector((state) => getPostById(state, id));

  const closeModal = () => {
    navigate(-1);
  };
  if (!postData) return null;
  const { imageURL, username, picture, desc, likes, isFavorite} = postData;
  return (
    <Dialog aria-labelledby="label" onDismiss={closeModal}>
      <div className={styles.modalContainer}>
        <div className={styles.imageContainer}>
          <img className={styles.postImage} src={imageURL} alt="post content" />
        </div>
        <div className={styles.postInfo}>
          <PostHeader pictureSrc={picture} username={username} />
          <div className={styles.commentBox}></div>
          <PostInfo desc={desc} likes={likes} username={username} />
          <PostControls id={id} isFavorite={isFavorite} />
        </div>
      </div>
    </Dialog>
  );
};

export default PostModal;
