import { useParams, useNavigate } from 'react-router';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { useAppSelector } from '../../../redux/hooks';
import { getPostById } from '../../../redux/slices/postsSlice';
import PostExpanded from '../PostExpanded/PostExpanded';

const PostModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postData = useAppSelector((state) => getPostById(state, id));

  const closeModal = () => {
    navigate(-1);
  };
  if (!postData) return null;
  return (
    <Dialog aria-labelledby="label" onDismiss={closeModal}>
      <PostExpanded {...postData} />
    </Dialog>
  );
};

export default PostModal;
