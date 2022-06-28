import { Post } from '../../../redux/slices/postsSlice';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const PostMiniature = ({ postData }: { postData: Post }) => {
  let location = useLocation();
  console.log(postData);
  return (
    <div>
      <Link state={{ backgroundLocation: location }} to={`/post/${postData.id}`}>
        <img src={postData.imageURL} alt="post" />
      </Link>
    </div>
  );
};

export default PostMiniature;
