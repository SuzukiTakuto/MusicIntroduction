import React, { useState, useRef } from 'react'
import styled from 'styled-components';
import Genre from './Genre';
import { spotifyGetMethod } from '../utils';
import SearchIcon from '../icons/SearchIcon';
import { SongData } from '../type';

type Props = {
  data: SongData[],
  setData: React.Dispatch<React.SetStateAction<SongData[]>>,
}

const SearchForm = (props: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  //const [ genre, setGenre ] = useState<string>("");
  

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchRef.current === null) return
    if (searchRef.current.value === "") return
    const searchWord = searchRef.current.value;

    fetch(`https://api.spotify.com/v1/search?type=track&q=${searchWord}`, spotifyGetMethod).then((res) => {
      return res.json();
    }).then((data) => {
      props.setData([]);
      console.log(data);
      data.tracks.items.forEach((item: any) => {
        const newData = {
          img: item.album.images[1].url,
          songName: item.name,
          artsitName: item.artists[0].name,
          spotifyId: item.uri
        }
        props.setData((prevData) => [...prevData, newData]);
      });
      console.log(props.data)
    }).catch((err: Error) => {
      console.log(err);
    });
  }

  return (
    <Container>
        <form onSubmit={(e) => handleSearch(e)}>
            <InputContainer>
                <Input placeholder='検索' ref={searchRef} />
                <SearchIcon />
            </InputContainer>
        </form>
        {/*<Genre genre={genre} setGenre={setGenre} />*/}
    </Container>
  )
}

const Container = styled.div`
    
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Input = styled.input`
    width: calc(100% - 50px);
    height: 38px;
    border-radius: 500px;
    border: none;
    background-color: #eeeef0;
    display: inline-block;
    box-sizing: border-box;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);
    padding-left: 10%;
`;

const SearchBottun = styled.input`
    width: 11.97%;
    height: 35px;
    cursor: pointer;
    display: none;
`;

export default SearchForm