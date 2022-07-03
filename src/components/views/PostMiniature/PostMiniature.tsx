import { Post } from '../../../redux/slices/postsSlice';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './PostMiniature.module.scss'

const PostMiniature = ({ postData }: { postData: Post }) => {
  let location = useLocation();
  console.log(postData);
  return (
    <div className={styles.layout}>
      <Link state={{ backgroundLocation: location }} to={`/post/${postData.id}`}>
        <img className={styles.image} src={postData.imageURL} alt="post" />
      </Link>
    </div>
  );
};

export default PostMiniature;
