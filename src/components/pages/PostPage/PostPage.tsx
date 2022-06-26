import { useParams } from 'react-router';
import { useAppSelector } from '../../../redux/hooks';
import { getPostById } from '../../../redux/slices/postsSlice';
import PostExpanded from '../../views/PostExpanded/PostExpanded';
import { getAllPosts } from '../../../redux/slices/postsSlice';

const PostPage = () => {
  const { id } = useParams();
  const allPosts = useAppSelector(getAllPosts)
  const postData = useAppSelector((state) => getPostById(state, id));

  console.log(postData, allPosts, id);

  if (!postData) return null;
  return (
    <PostExpanded {...postData} />
  )
};

export default PostPage;
