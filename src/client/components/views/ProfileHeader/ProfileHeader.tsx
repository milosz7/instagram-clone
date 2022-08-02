import { useParams } from 'react-router';
import { useAppSelector } from '../../../redux/hooks';
import { getProfileData } from '../../../redux/slices/profilesSlice';
import styles from './ProfileHeader.module.scss';

const ProfileHeader = ({ postsLength }: { postsLength: number }) => {
  const { username } = useParams();
  const profileData = useAppSelector((state) => getProfileData(state, username));
  if (!profileData) return null;

  const { picture, followers, following } = profileData;

  return (
    <div className={styles.container}>
      <div>
        <img className={styles.image} src={picture} alt="avatar" />
      </div>
      <div>
        <h2 className={styles.username}>{profileData.username}</h2>
        <div className={styles.infoLayout}>
          <p>
            <span className={styles.bolded}>Posts: </span>
            {postsLength}
          </p>
          <p>
            <span className={styles.bolded}>Followers: </span>
            {followers}
          </p>
          <p>
            <span className={styles.bolded}>Following: </span>
            {following}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
