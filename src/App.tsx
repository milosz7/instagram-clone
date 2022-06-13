import Container from './components/common/Container/Container';
import Navbar from './components/views/Navbar/Navbar';
import Home from './components/pages/Home/Home'
import { Route, Routes } from 'react-router';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
