import { useEffect, useRef, useCallback, useState } from 'react';
import Post from '../../views/Post/Post';
import styles from './PostsList.module.scss';
import Spinner from '../../common/Spinner/Spinner';
import axios from 'axios';
import { TrimmedPost } from '../../../../types/db-responses';
import { Types } from 'mongoose';

const PostsList = () => {
  const [postsData, setPostsData] = useState<TrimmedPost[]>([]);
  const [lastId, setLastId] = useState<null | Types.ObjectId>(null);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  const observer = useRef<IntersectionObserver>();

  const lastPostElement = useCallback(
    (elem: HTMLDivElement) => {
      if (loading && observer.current) return null;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          setLoading(true);
          const { data }: { data: TrimmedPost[] } = await axios.get(
            `/api/posts/load?lastid=${lastId}`
          );
          if (!data.length) {
            setLoading(false);
            setNoData(true);
          }
          if (data.length) {
            setLastId(data[data.length - 1].id);
            setPostsData([...postsData, ...data]);
            setLoading(false);
          }
        }
      });
      if (elem) observer.current.observe(elem);
    },
    [postsData]
  );

  useEffect(() => {
    const initialPostsFetch = async () => {
      setLoading(true);
      const { data }: { data: TrimmedPost[] } = await axios.get('/api/posts/load');
      setLastId(data[data.length - 1].id);
      setPostsData([...data]);
      setLoading(false);
    };
    initialPostsFetch();
  }, []);

  return (
    <div className={styles.postContainer}>
      {postsData.map((data, idx: number) => {
        if (postsData.length === idx + 1) {
          return <Post ref={lastPostElement} key={idx} {...data} />;
        }
        return <Post key={idx} {...data} />;
      })}
      {loading && <Spinner />}
      {noData && (
        <div className={styles.noData}>
          <p>There are no more posts avaliable, please refresh the page!</p>
        </div>
      )}
    </div>
  );
};

export default PostsList;
