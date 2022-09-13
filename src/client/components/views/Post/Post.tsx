import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './Post.module.scss';
import PostHeader from '../PostHeader/PostHeader';
import PostControls from '../PostControls/PostControls';
import PostInfo from '../PostInfo/PostInfo';
import mongoose, { Schema } from 'mongoose';
import { msToPublishedInfo } from '../../../../utils/msToPublishedInfo';

const Post = React.memo(
  React.forwardRef<
    HTMLDivElement,
    {
      id: mongoose.Types.ObjectId;
      desc?: string;
      comments: Schema.Types.ObjectId[];
      published: string;
      likedBy: Schema.Types.ObjectId[];
      photo: string;
      avatar: string;
      username: string;
    }
  >(({ id, desc, comments, published, likedBy, photo, avatar, username }, ref) => {
    let location = useLocation();
    const publishedInfo = useMemo(() => msToPublishedInfo(Date.now() - Date.parse(published)), [published]);
    return (
      <div ref={ref} className={styles.container}>
        <PostHeader pictureSrc={avatar} username={username} />
        <Link state={{ backgroundLocation: location }} to={`/post/${id}`}>
          <img className={styles.image} src={photo} alt="post content" />
        </Link>
        <div className={styles.postLabel}>
          <PostControls id={id} />
          <PostInfo likes={likedBy.length} username={username} desc={desc} published={publishedInfo} />
        </div>
      </div>
    );
  })
);

export default Post;
