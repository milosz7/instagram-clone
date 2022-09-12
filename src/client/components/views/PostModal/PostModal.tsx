import { useParams, useNavigate } from 'react-router';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import PostExpanded from '../PostExpanded/PostExpanded';
import { TrimmedPost } from '../../../../types/interfaces';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PostModal.module.scss';

const PostModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState<null | TrimmedPost>(null);
  
  useEffect(() => {
    const fetchPostData = async () => {
      const { data }: { data: TrimmedPost } = await axios.get(`/api/posts/${id}`);
      setPostData(data);
    };
    fetchPostData();
  });

  const closeModal = () => {
    navigate(-1);
  };
  if (!postData) return null;
  return (
    <Dialog  aria-labelledby="label" onDismiss={closeModal}>
      <div className={styles.dialog}>
      <PostExpanded {...postData} />
      </div>
    </Dialog>
  );
};

export default PostModal;
