import React, { useState, useEffect, useContext, createContext } from 'react';
import Profile from '../components/Profile';
import TimeLine from '../components/TimeLine';
import Search from '../components/Search';
import styled from 'styled-components';
import { User, Post, SongData } from '../type';
import { getTokenFromUrl } from '../spotify/Spotify';
import { getMethod, spotifyGetMethod } from '../utils';
import { useHistory } from 'react-router-dom';
import { Context, PlaylistContext } from '../context';

const MainPage = () => {
  const history = useHistory();
  const [user, setUser] = useState<User>({
    username: '',
    email: '',
    userId: '',
    iconImg: '',
    spotifyId: ''
  });

  const [postInput, setPostInput] = useState(false);
  const [postData, setPostData] = useState<Post>({
    albumImg: "",
    songName: "",
    artistName: "",
    spotifyId: "",
  });
  const [playlistItems, setPlaylistItems] = useState<SongData[]>([]);
  const [uris, setUris] = useState<string[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  if (!localStorage.getItem("token")) {
    history.push('/login');
  }

  let apiData: any;
  useEffect(() => {
    fetch("http://localhost:8000/v1/user/get/", getMethod).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(localStorage.getItem("accessToken"))
      apiData = data;
    }).catch(() => {
      console.log("error");
      history.push('/login');
    });
    getAccessToken();
  }, []);

  let spotifyData: any;
  useEffect(() => {
    fetch("https://api.spotify.com/v1/me", spotifyGetMethod).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
      spotifyData = data;
      userSetting();
    }).catch((err: Error) => {
      console.log(err);
    });
  }, []);

  const getAccessToken = () => {
    const hash = getTokenFromUrl();
    console.log(hash)
    window.location.hash = "";
    const accessToken = hash.access_token;
    
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
  }

  const userSetting = () => {
    console.log(apiData);
    console.log(spotifyData);

    if (!apiData && !spotifyData) return

    const tempUser = {
      username: apiData.username,
      email: apiData.email,
      userId: apiData.userId,
      iconImg: apiData.iconImg,
      spotifyId: spotifyData.id
    };
    console.log(tempUser)
    setUser(tempUser);
  }

  return (
    <Wrapper>
      <Context.Provider value={{postInput, setPostInput, postData, setPostData, user, isUpdate, setIsUpdate}}>
        <PlaylistContext.Provider value={{playlistItems, setPlaylistItems, uris, setUris, isCreated, setIsCreated}}>
          <Profile user={user} />
          <Search />
          <TimeLine />
        </PlaylistContext.Provider>
      </Context.Provider>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  background-color: #E1E3E6;
  position: relative;
`;

export default MainPage