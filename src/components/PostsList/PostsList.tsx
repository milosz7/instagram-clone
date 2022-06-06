import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchPostData, getPostStatus, getAllPosts } from '../../redux/slices/postsSlice'
import Post from '../Post/Post';

const PostsList: React.FC = () => {

  const postsData = useAppSelector(getAllPosts);
  const postsStatus = useAppSelector(getPostStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPostData());
    }
  })

  return (
    <div>
      {postsData.map(({imageURL, username, picture, likes}, idx) => <Post imageURL={imageURL} likes={likes} pictureSrc={picture} username={username} key={idx} />)}
    </div>
  )
};

export default PostsList;