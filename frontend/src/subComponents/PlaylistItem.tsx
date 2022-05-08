import React from 'react';
import { SongData } from '../type';
import styled from 'styled-components';

const PlaylistItem = (props: SongData) => {
  return (
    <div>
        <ItemContainer>
            <TrackInfo>
            <AlbumImg src={props.img} />
            <div>
                <SongName>{props.songName}</SongName> 
                <ArtistName>{props.artsitName}</ArtistName>
            </div>
            </TrackInfo>
        </ItemContainer>
    </div>
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



export default PlaylistItem