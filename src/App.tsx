import Container from './components/common/Container/Container';
import Navbar from './components/views/Navbar/Navbar';
import Home from './components/pages/Home/Home';
import Discover from './components/pages/Discover/Discover';
import Favorites from './components/pages/Favorites/Favorites';
import { Route, Routes } from 'react-router';
import Add from './components/pages/Add/Add';
import Messages from './components/pages/Messages/Messages';
import NotFound from './components/pages/NotFound/NotFound';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='favorites' element={<Favorites />} />
          <Route path='discover' element={<Discover />} />
          <Route path="add" element={<Add />} />
          <Route path="messages" element={<Messages />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
