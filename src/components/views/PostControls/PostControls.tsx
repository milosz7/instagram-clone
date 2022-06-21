import IconButtonAnimated from '../../common/IconButtonAnimated/IconButtonAnimated';
import styles from './PostControls.module.scss';
import { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { likePost, dislikePost } from '../../../redux/slices/postsSlice';
import IconButton from '../../common/IconButton/IconButton';

const PostInfo = ({ isFavorite, id }: {isFavorite: boolean, id: string}) => {
  const [liked, setLiked] = useState(isFavorite);
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
    <div className={styles.container}>
      <IconButtonAnimated 
        icon="heart"
        isClicked={liked}
        colorClass="buttonLikedRed"
        action={() => manageClick(id)}
      />
      <IconButton icon="comment" />
      <IconButton icon="location-arrow" />
    </div>
  )
}

export default PostInfo;