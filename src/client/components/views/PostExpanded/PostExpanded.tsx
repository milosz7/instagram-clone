import PostHeader from '../PostHeader/PostHeader';
import PostControls from '../PostControls/PostControls';
import PostInfo from '../PostInfo/PostInfo';
import styles from './PostExpanded.module.scss';
import { TrimmedPost } from '../../../../types/db-responses';
import { msToPublishedInfo } from '../../../../utils/helpers-client';
import { useMemo } from 'react';

const PostExpanded = ({
  id,
  desc,
  comments,
  published,
  likedBy,
  photo,
  avatar,
  username,
}: TrimmedPost) => {
  const publishedInfo = useMemo(
    () => msToPublishedInfo(Date.now() - Date.parse(published)),
    [published]
  );
  return (
    <div className={styles.modalContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.postImage} src={photo} alt="post content" />
      </div>
      <div className={styles.postInfo}>
        <PostHeader pictureSrc={avatar} username={username} />
        <div className={styles.commentBox}></div>
        <PostControls id={id} />
        <PostInfo desc={desc} likes={likedBy.length} username={username} published={publishedInfo} />
      </div>
    </div>
  );
};

export default PostExpanded;
