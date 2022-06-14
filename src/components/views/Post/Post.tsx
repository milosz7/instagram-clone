import React, { useState } from 'react';
import IconButton from '../../common/IconButton/IconButton';
import styles from './Post.module.scss';
import { likePost, dislikePost } from '../../../redux/slices/postsSlice';
import { useAppDispatch } from '../../../redux/hooks';
import clsx from 'clsx';
import IconButtonAnimated from '../../common/IconButtonAnimated/IconButtonAnimated';

type Props = {
  imageURL: string;
  username: string;
  pictureSrc: string;
  likes: number;
  id: string;
};

const Post = React.memo(
  React.forwardRef<HTMLDivElement, Props>(({ imageURL, username, pictureSrc, likes, id }, ref) => {
    const [liked, setLiked] = useState(false);
    const dispatch = useAppDispatch();

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
        <img src={imageURL} alt="post content" />
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
          <p className={styles.likes}>Total likes: {likes}</p>
        </div>
      </div>
    );
  })
);

export default Post;
