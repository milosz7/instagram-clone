import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getPostByUsername } from "../../../redux/slices/postsSlice";
import { getProfileData, fetchProfileData, getCreatedProfiles } from "../../../redux/slices/profilesSlice";
import Spinner from "../../common/Spinner/Spinner";

const ProfilePostsList = () => {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const createdProfilesList = useAppSelector(getCreatedProfiles);
  const relatedPost = useAppSelector(state => getPostByUsername(state, username))
  if (username && relatedPost && createdProfilesList.indexOf(username) === -1) {
    dispatch(fetchProfileData(relatedPost));
  }

  const [ profileData ] = useAppSelector(state => getProfileData(state, username));

  if (!profileData) {
    return <Spinner />
  }

  return(
    <div>
      {profileData.posts.map((post, idx) => <div key={idx}>{post.desc}</div>)}
    </div>
  )
}

export default ProfilePostsList;