import React from 'react';
import styled from 'styled-components';
import { PostData } from '../type';
import PostItem from './PostItem';

type Props = {
    posts: PostData[]
}

const Posts = (props: Props) => {
    console.log(props.posts)
  return (
    <Container>
        {props.posts && props.posts.map((post) => (
            <PostItem post={post} key={post.postId} />
        ))}
    </Container>
  )
}

const Container = styled.div`
  width: 96.55%;
  max-height: calc(100vh - 100px);
  margin: 100px auto 0;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
`

export default Posts