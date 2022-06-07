import { useEffect, useRef, useCallback} from "react";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchPostData, getPostStatus, getAllPosts } from '../../redux/slices/postsSlice'
import Post from '../Post/Post';

const PostsList: React.FC = () => {

  const postsData = useAppSelector(getAllPosts);
  const postsStatus = useAppSelector(getPostStatus);
  const dispatch = useAppDispatch();

  const observer = useRef<IntersectionObserver>();

  const lastPostElement = useCallback((elem: HTMLDivElement) => {
    if (postsStatus === 'loading') return
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries  => {
      if (entries[0].isIntersecting) {
        dispatch(fetchPostData());
      }
    })
    if (elem) observer.current.observe(elem)
  }, [postsStatus, dispatch]) 

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPostData());
    }
  }, [dispatch, postsStatus])

  return (
    <div>
      {postsData.map(({ imageURL, username, picture, likes }, idx: number) => { 
        if(postsData.length === idx + 1) {
          return (
            <Post
            ref={lastPostElement}
            imageURL={imageURL}
            likes={likes}
            pictureSrc={picture}
            username={username}
            key={idx}
          />
          ) 
        } 
        return(
        <Post
          imageURL={imageURL}
          likes={likes}
          pictureSrc={picture}
          username={username}
          key={idx}
        />
      )})}
      {postsStatus === 'loading' && 'Loading posts...'}
    </div>
  );
};

export default PostsList;