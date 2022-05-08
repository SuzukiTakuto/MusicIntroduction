import React, {useContext} from 'react';
import styled from 'styled-components';
import { SongData } from '../type';
import { Context } from '../context';

const ResultItem = (props: SongData) => {
  const {postInput, setPostInput, postData, setPostData} = useContext(Context);

  const onClick = () => {
    setPostInput(true);
    setPostData({
      albumImg: props.img,
      songName: props.songName,
      artistName: props.artsitName,
      spotifyId: props.spotifyId,
    });
  }

  return (
    <ItemContainer>
        <TrackInfo>
          <AlbumImg src={props.img} />
          <div>
              <SongName>{props.songName}</SongName> 
              <ArtistName>{props.artsitName}</ArtistName>
          </div>
        </TrackInfo>
        <PostBtn onClick={() => onClick()}>投稿</PostBtn>
    </ItemContainer>
  )
}

const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
`;

const TrackInfo = styled.div`
  display: flex;
  width: 60%;
`;

const AlbumImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 11px;
`;

const ArtistName = styled.p`
    color: #b3b3b3;
    margin: 0;
    font-size: 12px;
`;

const SongName = styled.p`
    color: #fff;
    margin: 0;
    font-size: 12px;
`;

const PostBtn = styled.button`
  border: none;
  cursor: pointer;
  color: #fff;
  background-color: #000;
  width: 30%;
  border-radius: 30px;
  transition: .2s;

  &:hover {
    background-color: #222;
  }
`;

export default ResultItem