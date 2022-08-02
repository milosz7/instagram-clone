import styles from './PostInfo.module.scss';

const PostInfo = ({
  likes,
  username,
  desc,
}: {
  likes: number;
  username: string;
  desc: string;
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.bolded}>
        {likes} {likes !== 1 ? 'likes' : 'like'}
      </p>
      <p className={styles.desc}>
        <span className={styles.bolded}>{username + ' '}</span>
        {desc}
      </p>
    </div>
  );
};

export default PostInfo;
