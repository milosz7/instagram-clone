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

const ProfilePostsList = () => {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const postStatus = useAppSelector(getPostStatus);
  const createdProfilesList = useAppSelector(getCreatedProfiles);
  const relatedPost = useAppSelector((state) => getPostByUsername(state, username));
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
    <div>
      {profilePosts.map((post, idx) => (
        <PostMiniature key={idx} postData={post} />
      ))}
    </div>
  );
};

export default ProfilePostsList;
