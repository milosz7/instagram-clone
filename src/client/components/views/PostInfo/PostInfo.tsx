import styles from './PostInfo.module.scss';

const PostInfo = ({
  likes,
  username,
  desc,
  published
}: {
  likes: number;
  username: string;
  desc?: string;
  published: string
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.bolded}>
        {likes} {likes !== 1 ? 'likes' : 'like'}
      </p>
      {desc && (
        <p className={styles.desc}>
          <span className={styles.bolded}>{username + ' '}</span>
          {desc}
        </p>
      )}
      <p className={styles.published}>{published}</p>
    </div>
  );
};

export default PostInfo;
