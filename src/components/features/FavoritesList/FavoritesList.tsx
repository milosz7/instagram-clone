import { getFavoritePosts } from '../../../redux/slices/postsSlice';
import { useAppSelector } from '../../../redux/hooks';
import Post from '../../views/Post/Post';

const FavoritesList = () => {
  const favoritePosts = useAppSelector(getFavoritePosts);
  console.log(favoritePosts)

  if (favoritePosts.length === 0)
    return (
      <div>
        <h1>You do not have favorite posts!</h1>
        <h2>Like a post first and then go back to favorites.</h2>
      </div>
    );
  return (
    <>
      {favoritePosts.map(({ id, imageURL, username, picture, likes, isFavorite }, idx: number) => {
        return (
          <Post
            id={id}
            imageURL={imageURL}
            likes={likes}
            pictureSrc={picture}
            username={username}
            key={idx}
            isFavorite={isFavorite}
          />
        );
      })}
    </>
  );
};

export default FavoritesList;
