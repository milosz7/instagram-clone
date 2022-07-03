import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  getPostByUsername,
  fetchProfilePosts,
  getPostStatus,
  getAllUserPosts,
} from '../../../redux/slices/postsSlice';
import { getCreatedProfiles } from '../../../redux/slices/profilesSlice';
import Spinner from '../../common/Spinner/Spinner';
import PostMiniature from '../../views/PostMiniature/PostMiniature';
import { createProfile } from '../../../redux/slices/profilesSlice';
import styles from './ProfilePostsList.module.scss';
import { Post } from '../../../redux/slices/postsSlice';

const ProfilePostsList = ({relatedPost}: {relatedPost: Post | undefined}) => {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const postStatus = useAppSelector(getPostStatus);
  const createdProfilesList = useAppSelector(getCreatedProfiles);
  if (username && relatedPost && createdProfilesList.indexOf(username) === -1) {
    const userBasicData = {
      username: relatedPost.username,
      picture: relatedPost.picture,
    };
    dispatch(createProfile(username));
    dispatch(fetchProfilePosts(userBasicData));
  }

  const profilePosts = useAppSelector((state) => getAllUserPosts(state, username));

  if (postStatus === 'loading') {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      {profilePosts.map((post, idx) => (
        <PostMiniature key={idx} postData={post} />
      ))}
    </div>
  );
};

export default ProfilePostsList;
