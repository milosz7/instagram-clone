import { useParams } from 'react-router';
import PostExpanded from '../../views/PostExpanded/PostExpanded';
import { useState, useEffect } from 'react';
import { TrimmedPost } from '../../../../types/interfaces';
import axios from 'axios';
import styles from './PostPage.module.scss';

const PostPage = () => {

  const { id } = useParams();
  const [postData, setPostData] = useState<null | TrimmedPost>(null);
  
  useEffect(() => {
    const fetchPostData = async () => {
      const { data }: { data: TrimmedPost } = await axios.get(`/api/posts/${id}`);
      setPostData(data);
    };
    fetchPostData();
  });

  if (!postData) return null;
  return (
    <div className={styles.container}>
      <PostExpanded {...postData} />
    </div>
  )
};

export default PostPage;
