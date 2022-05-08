import React from 'react';
import { SongData } from '../type';
import styled from 'styled-components';
import ResultItem from './ResultItem';

type Props = {
  data: SongData[],
}

const SearchResult = (props: Props) => {
  const songs = props.data;
  return (
    <ResultContainer>
      {songs.map((song) => (
        <ResultItem img={song.img} artsitName={song.artsitName} songName={song.songName} spotifyId={song.spotifyId} />
      ))}
    </ResultContainer>
  )
}

const ResultContainer = styled.div`
  margin-top: 20px;
  height: 75%;
  overflow-y: scroll;
`;



export default SearchResult