import Container from './components/common/Container/Container';
import Navbar from './components/views/Navbar/Navbar';
import Home from './components/pages/Home/Home';
import Discover from './components/pages/Discover/Discover';
import Favorites from './components/pages/Favorites/Favorites';
import { Route, Routes, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Add from './components/pages/Add/Add';
import PostModal from './components/views/PostModal/PostModal';
import Messages from './components/pages/Messages/Messages';
import NotFound from './components/pages/NotFound/NotFound';
import PostPage from './components/pages/PostPage/PostPage';
import Profile from './components/pages/Profile/Profile';
import Login from './components/pages/Login/Login';

function App() {
  const location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isSessionActive = async () => {
      const { data }: { data: { logged: boolean } } = await axios.get('/auth/is-logged', {
        withCredentials: true,
      });
      setLoggedIn(data.logged);
    };

    isSessionActive();
  }, []);

  if (!loggedIn)
    return (
      <div>
        <Routes>
          <Route path="/" element={<Login action={setLoggedIn} />} />
          <Route path="/register"></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );

  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Home />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="discover" element={<Discover />} />
          <Route path="add" element={<Add />} />
          <Route path="post/:id" element={<PostPage />}></Route>
          <Route path="messages" element={<Messages />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {state?.backgroundLocation && (
          <Routes>
            <Route path="/post/:id" element={<PostModal />}></Route>
          </Routes>
        )}
      </Container>
    </>
  );
}

export default App;
