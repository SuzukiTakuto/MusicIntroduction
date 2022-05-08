import React, { useState } from 'react';
import styled from 'styled-components';
import SearchForm from '../subComponents/SearchForm';
import SearchResult from '../subComponents/SearchResult';
import { SongData } from '../type';
import Playlist from '../subComponents/Playlist';

const Search = () => {
  const [ data, setData ] = useState<SongData[]>([]);

  return (
    <Container>
      <SearchContainer>
        <SearchForm data={data} setData={setData} />
        <SearchResult data={data} />
      </SearchContainer>
      <Playlist />
    </Container>
  )
}

const Container = styled.div`
    width: 26.364%;
    background-color: #000;
`;

const SearchContainer = styled.div`
  margin: 55px 55px 10px;
  height: 50vh;
  border-bottom: #fff 1px solid;
`;

export default Search