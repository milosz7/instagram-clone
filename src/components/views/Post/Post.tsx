import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './Post.module.scss';
import PostHeader from '../PostHeader/PostHeader';
import PostControls from '../PostControls/PostControls';
import PostInfo from '../PostInfo/PostInfo';

type Props = {
  imageURL: string;
  username: string;
  pictureSrc: string;
  likes: number;
  id: string;
  desc: string;
  isFavorite: boolean;
};

const Post = React.memo(
  React.forwardRef<HTMLDivElement, Props>(
    ({ imageURL, username, pictureSrc, likes, id, isFavorite, desc }, ref) => {
      let location = useLocation();

      return (
        <div ref={ref} className={styles.container}>
          <PostHeader pictureSrc={pictureSrc} username={username} />
          <Link state={{ backgroundLocation: location }} to={`/post/${id}`}>
            <img src={imageURL} alt="post content" />
          </Link>
          <div className={styles.postLabel}>
            <PostControls id={id} isFavorite={isFavorite} />
            <PostInfo likes={likes} username={username} desc={desc} />
          </div>
        </div>
      );
    }
  )
);

export default Post;
