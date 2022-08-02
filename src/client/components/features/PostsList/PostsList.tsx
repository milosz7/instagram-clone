import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchPostData, getPostStatus, getOnePostForUser } from '../../../redux/slices/postsSlice';
import Post from '../../views/Post/Post';
import styles from './PostsList.module.scss';
import Spinner from '../../common/Spinner/Spinner';

const PostsList = () => {
  const postsData = useAppSelector(getOnePostForUser);
  const postsStatus = useAppSelector(getPostStatus);
  const dispatch = useAppDispatch();

  const observer = useRef<IntersectionObserver>();

  const lastPostElement = useCallback(
    (elem: HTMLDivElement) => {  
      if (postsStatus === 'loading' && observer.current) return null;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchPostData());
        }
      });
      if (elem) observer.current.observe(elem);
    },
    [postsStatus, dispatch]
  );

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPostData());
    }
  }, [dispatch, postsStatus]);

  return (
    <div className={styles.postContainer}>
      {postsData.map(({ id, imageURL, username, picture, likes, isFavorite, desc }, idx: number) => {
        if (postsData.length === idx + 1) {
          return (
            <Post
              id={id}
              ref={lastPostElement}
              imageURL={imageURL}
              likes={likes}
              pictureSrc={picture}
              username={username}
              desc={desc}
              key={idx}
              isFavorite={isFavorite}
            />
          );
        }
        return (
          <Post
            id={id}
            imageURL={imageURL}
            likes={likes}
            pictureSrc={picture}
            username={username}
            desc={desc}
            key={idx}
            isFavorite={isFavorite}
          />
        );
      })}
      {postsStatus === 'loading' && <Spinner />}
    </div>
  );
};

export default PostsList;
