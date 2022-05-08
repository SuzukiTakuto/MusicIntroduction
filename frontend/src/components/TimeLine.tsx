import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import { Context } from '../context';
import PostModal from '../subComponents/PostModal';
import Posts from '../subComponents/Posts';
import { PostData } from '../type';

const TimeLine = () => {
  const {postInput, setPostInput, isUpdate} = useContext(Context);
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/v1/post/getall", {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      redirect: 'follow',
    }).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
      setPosts(data.posts);
    }).catch((err: Error) => {
      console.log(err);
    });
    console.log(isUpdate)
  }, [isUpdate]);

  return (
    <Container>
      <Posts posts={posts} />
      {postInput && 
        <PostModal />
      }
    </Container>
  )
}

const Container = styled.div`
    width: 73.644%;
    background-color: #121212;
    position: relative;
`;

export default TimeLine;