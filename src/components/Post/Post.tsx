import styles from './Post.module.scss';

interface Props {
  imageURL: string;
  username: string;
  pictureSrc: string;
  likes: number;
}

const Post: React.FC<Props> = ({imageURL, username, pictureSrc, likes}) => {


  return (
    <div className={styles.postContainer}>
      <div className={styles.profileData}>
        <img className={styles.profilePicture} src={pictureSrc} alt="avatar" />
        <p className={styles.profileNickname}>{username}</p>
      </div>
      <img src={imageURL} alt="post content" />
      <div className={styles.postLabel}>
        <div className={styles.postControls}>
          <i className='fa fa-heart-o'></i>
          <i className='fa fa-comment-o'></i>
          <i className={`fa fa-location-arrow ${styles.arrow}`}></i>
        </div>
        <p className={styles.likes}>Total likes: {likes}</p>
      </div>
    </div>
  )
}

export default Post;