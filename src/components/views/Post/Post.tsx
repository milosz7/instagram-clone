import React, { useState } from 'react';
import styles from './Post.module.scss';
import { getPostById, likePost, dislikePost } from '../../../redux/slices/postsSlice';
import { useAppDispatch, useAppSelector} from '../../../redux/hooks';

type Props = {
  imageURL: string;
  username: string;
  pictureSrc: string;
  likes: number;
  id: string;
}

const Post = React.memo(React.forwardRef<HTMLDivElement, Props>(({imageURL, username, pictureSrc, likes, id}, ref) => {

  const [liked, setLiked] = useState(false)
  const dispatch = useAppDispatch();

  const manageClick = (id: string) => {
    setLiked(!liked);
    changePostStatus(id)
  }

  const changePostStatus = (id: string) => {
    if (!liked) dispatch(likePost(id));
    if (liked) dispatch(dislikePost(id)); 
  }

  return (
    <div ref={ref} className={styles.postContainer}>
      <div className={styles.profileData}>
        <img className={styles.profilePicture} src={pictureSrc} alt="avatar" />
        <p className={styles.profileNickname}>{username}</p>
      </div>
      <img src={imageURL} alt="post content" />
      <div className={styles.postLabel}>
        <div className={styles.postControls}>
          <button onClick={() => manageClick(id)} className={styles.iconButton}><i className={`fa fa-heart ${styles.stroke}`}></i></button>
          <button className={styles.iconButton}><i className={`fa fa-comment ${styles.stroke}`}></i></button>
          <button className={styles.iconButton}><i className={`fa fa-location-arrow ${styles.stroke}`}></i></button>
        </div>
        <p className={styles.likes}>Total likes: {likes}</p>
      </div>
    </div>
  )
}))

export default Post;