import React from 'react';
import Container from './components/Container/Container';
import Navbar from './components/Navbar/Navbar';
import PostsList from './components/PostsList/PostsList';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Container>
        <h1>test</h1>
        <PostsList></PostsList>
      </Container>
    </>
  );
}

export default App;
