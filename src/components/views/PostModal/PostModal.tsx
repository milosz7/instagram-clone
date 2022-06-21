import { useParams, useNavigate } from "react-router";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import styles from './PostModal.module.scss';
import { useAppSelector } from "../../../redux/hooks";
import { getPostById } from "../../../redux/slices/postsSlice";

const PostModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postData = useAppSelector(state => getPostById(state, id))
  
  const closeModal = () => {
    navigate(-1)
  }
  console.log(postData)
  if (!postData) return null;
  return (
    <Dialog aria-labelledby="label" onDismiss={closeModal}>
      <div className={styles.modalContainer}>
        <img className={styles.postImage} src={postData.imageURL} alt="post" />
        <div>
          <div>
            <img className={styles.profilePicture} src={postData.picture} alt="avatar" />
            <p>{postData.username}</p>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default PostModal;