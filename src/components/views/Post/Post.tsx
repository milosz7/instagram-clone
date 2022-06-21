import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import IconButton from '../../common/IconButton/IconButton';
import styles from './Post.module.scss';
import { likePost, dislikePost } from '../../../redux/slices/postsSlice';
import { useAppDispatch } from '../../../redux/hooks';
import IconButtonAnimated from '../../common/IconButtonAnimated/IconButtonAnimated';

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
      const [liked, setLiked] = useState(isFavorite);
      const dispatch = useAppDispatch();
      let location = useLocation();

      const manageClick = (id: string) => {
        setLiked(!liked);
        changePostStatus(id);
      };

      const changePostStatus = (id: string) => {
        if (!liked) dispatch(likePost(id));
        if (liked) dispatch(dislikePost(id));
      };

      return (
        <div ref={ref} className={styles.postContainer}>
          <div className={styles.profileData}>
            <img className={styles.profilePicture} src={pictureSrc} alt="avatar" />
            <p className={styles.profileNickname}>{username}</p>
          </div>
          <Link state={{ backgroundLocation: location }} to={`/post/${id}`}>
            <img src={imageURL} alt="post content" />
          </Link>
          <div className={styles.postLabel}>
            <div className={styles.postControls}>
              <IconButtonAnimated
                icon="heart"
                isClicked={liked}
                colorClass="buttonLikedRed"
                action={() => manageClick(id)}
              />
              <IconButton icon="comment" />
              <IconButton icon="location-arrow" />
            </div>
            <div className={styles.postInfo}>
              <p className={styles.likes}>
                {likes} {likes !== 1 ? 'likes' : 'like'}
              </p>
              <p className={styles.postDesc}>
                <span className={styles.profileNickname}>{username + ' '}</span>
                {desc}
              </p>
            </div>
          </div>
        </div>
      );
    }
  )
);

export default Post;
