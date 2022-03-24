import React from 'react'
import Post from './Post';
import styled from 'styled-components';

const PostList = () => {
  return (
      <Container>
          <Post />
          <Post />
      </Container>
  )
}

const Container = styled.div`
    height: 74%;
    overflow-y: scroll;
`;

export default PostList;