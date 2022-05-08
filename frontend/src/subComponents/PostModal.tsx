import { stringify } from 'querystring';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../context';

const PostModal = () => {
  const {postInput, setPostInput, postData, setPostData, user, isUpdate, setIsUpdate} = useContext(Context);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const onClick = () => {
    if (!commentRef.current) return
    setPostInput(false);
    const data = {
      userId: user.userId,
      songname: postData.songName,
      artistname: postData.artistName,
      albumImg: postData.albumImg,
      comment: commentRef.current.value,
      userIconImg: user.iconImg,
      username: user.username,
      spotifyId: postData.spotifyId
    };
    console.log(data);
    
    fetch("http://localhost:8000/v1/post/create", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify(data)
    }).then((res) => {
      return res.json();
    }).then((data) => {
        console.log(data);
        setIsUpdate(!isUpdate);
    }).catch(()=>{
        console.log("error");
    });

    
  }

  return (
    <Container>
        <TrackInfo>
          <AlbumImg src={postData.albumImg} />
          <div>
              <SongName>{postData.songName}</SongName> 
              <ArtistName>{postData.artistName}</ArtistName>
          </div>
        </TrackInfo>
        <PostInput ref={commentRef} />
        <PostButton onClick={() => onClick()}>投稿</PostButton>
    </Container>
  )
}

const Container = styled.div`
    width: 393px;
    position: fixed;
    bottom: 36px;
    background-color: #363636;
    border-radius: 30px;
    padding: 20px;
    left: 50%;
    transform: translateX(-14%);

    box-sizing: border-box;
`;

const TrackInfo = styled.div`
    display: flex;
`;

const AlbumImg = styled.img`
  width: 110px;
  height: 110px;
  margin-right: 23px;
`;

const ArtistName = styled.p`
    color: #b3b3b3;
    margin: 0;
    font-size: 20px;
`;

const SongName = styled.p`
    color: #fff;
    margin: 0;
    font-size: 28px;
`;

const PostInput = styled.textarea`
    width: 100%;
    height: 80px;
    border-radius: 30px;
    margin-top: 40px;
    padding: 15px;
    box-sizing: border-box;
`;

const PostButton = styled.button`
    width: 100px;
    height: 40px;
    display: block;
    margin: 10px auto 0;
    background-color: #000;
    border-radius: 30px;
    border: none;
    color: #fff;
    cursor: pointer;

    &:hover {
        background-color: #222;
    }
`;

export default PostModal