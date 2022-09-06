import IconButtonAnimated from '../../common/IconButtonAnimated/IconButtonAnimated';
import styles from './PostControls.module.scss';
import IconButton from '../../common/IconButton/IconButton';
import { Types } from 'mongoose';

const PostControls = ({ id }: { id: Types.ObjectId }) => {

  if (!id) return null;

  const manageClick = (id: Types.ObjectId) => {

  };

  return (
    <div className={styles.container}>
      <IconButtonAnimated
        icon="heart"
        isClicked={false}
        colorClass="buttonLikedRed"
        action={() => manageClick(id)}
      />
      <IconButton icon="comment" />
      <IconButton icon="location-arrow" />
    </div>
  );
};

export default PostControls;
