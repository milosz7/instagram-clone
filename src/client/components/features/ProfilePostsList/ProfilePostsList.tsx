import PostMiniature from '../../views/PostMiniature/PostMiniature';
import styles from './ProfilePostsList.module.scss';
import { Post } from '../../../redux/slices/postsSlice';

const ProfilePostsList = ({profilePosts}: {profilePosts: Post[]}) => {

  return (
    <div className={styles.container}>
      {profilePosts.map((post, idx) => (
        <PostMiniature key={idx} postData={post} />
      ))}
    </div>
  );
};

export default ProfilePostsList;
