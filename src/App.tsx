import Container from './components/common/Container/Container';
import Navbar from './components/views/Navbar/Navbar';
import PostsList from './components/features/PostsList/PostsList';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Container>
        <PostsList></PostsList>
      </Container>
    </>
  );
}

export default App;
