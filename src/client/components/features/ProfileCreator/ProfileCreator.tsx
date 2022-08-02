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
import { createProfile } from '../../../redux/slices/profilesSlice';
import ProfilePostsList from '../ProfilePostsList/ProfilePostsList';
import ProfileHeader from '../../views/ProfileHeader/ProfileHeader';

const ProfileCreator = () => {
  const { username } = useParams();
  const relatedPost = useAppSelector((state) => getPostByUsername(state, username));
  const dispatch = useAppDispatch();
  const postStatus = useAppSelector(getPostStatus);
  const createdProfilesList = useAppSelector(getCreatedProfiles);
  if (username && relatedPost && createdProfilesList.indexOf(username) === -1) {
    const userBasicData = {
      username: relatedPost.username,
      picture: relatedPost.picture,
    };
    const profileData = {
      username: username,
      picture: relatedPost.picture,
      followers: Math.floor(Math.random() * 2000),
      following: Math.floor(Math.random() * 2000),
    }
    dispatch(createProfile(profileData));
    dispatch(fetchProfilePosts(userBasicData));
  }

  const profilePosts = useAppSelector((state) => getAllUserPosts(state, username));

  if (postStatus === 'loading') {
    return <Spinner />;
  }

  return (
    <div>
      <ProfileHeader postsLength={profilePosts.length} />
      <ProfilePostsList profilePosts={profilePosts}/>
    </div>
  )
}

export default ProfileCreator;