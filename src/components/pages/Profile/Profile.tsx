import ProfilePostsList from "../../features/ProfilePostsList/ProfilePostsList";
import { useAppSelector } from "../../../redux/hooks";
import { getPostByUsername } from "../../../redux/slices/postsSlice";
import { useParams } from "react-router";

const Profile = () => {
  const { username } = useParams();
  const relatedPost = useAppSelector((state) => getPostByUsername(state, username));

  return (
    <>
    <h1>Profile</h1>
    <ProfilePostsList relatedPost={relatedPost} />
    </>
  )
}

export default Profile;