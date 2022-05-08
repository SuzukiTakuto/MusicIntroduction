import React, { useContext } from 'react';
import styled from 'styled-components';
import { PostData, SongData } from '../type';
import {PlaylistContext } from '../context';

type Props = {
    post: PostData
}

const PostItem = (props: Props) => {
  const post = props.post;
  const {playlistItems, setPlaylistItems, uris, setUris, setIsCreated} = useContext(PlaylistContext);
  const onClick = () => {
      setPlaylistItems((prevItems) => [...prevItems, {
        img: post.albumImg,
        songName: post.songname,
        artsitName: post.artistname,
        spotifyId: post.spotifyId,
      }]);
      setUris([...uris, post.spotifyId]);
      setIsCreated(false);
  }

  return (
    <Container onClick={() => onClick()}>
        <TrackInfo>
          <AlbumImg src={post.albumImg} />
          <div>
              <SongName>{post.songname.length > 5 ? post.songname.substring(0, 5) : post.songname}</SongName> 
              <ArtistName>{post.artistname}</ArtistName>
          </div>
        </TrackInfo>
        <User>
            <UserIcon src={post.userIconImg} />
            <Username>{post.username}</Username>
        </User>
        <Comment>{post.comment}</Comment>
    </Container>
  )
}

const Container = styled.button`
  width: 210px;
  height: 155px;
  margin: 20px;
  background-color: #282828;
  border: none;
  border-radius: 10px;
  padding: 13px;
  cursor: pointer;

  box-sizing: border-box;

  &:hover {
    background-color: #555;
  }
`;

const TrackInfo = styled.div`
    display: flex;
    align-items: center;
`;

const AlbumImg = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 20px;
`;

const ArtistName = styled.p`
    color: #b3b3b3;
    margin: 0;
    font-size: 14px;
`;

const SongName = styled.p`
    color: #fff;
    margin: 0;
    line-height: 1.2;
    font-size: 18px;
`;

const User = styled.div`
    display: flex;
    align-items: center;
`;

const UserIcon = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
`;

const Username = styled.p`
    font-size: 14px;
    color: #fff;
`;

const Comment = styled.p`
    color: #fff;
    display: block;
    margin: 0;
`

export default PostItem