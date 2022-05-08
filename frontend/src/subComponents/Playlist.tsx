import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PlaylistItem from './PlaylistItem';
import { PostData } from '../type';
import {PlaylistContext, Context } from '../context';

const Playlist = () => {
  const {playlistItems, setPlaylistItems, uris, isCreated, setIsCreated} = useContext(PlaylistContext);
  const {user} = useContext(Context);
  

  const onClick = async () => {
    fetch(`https://api.spotify.com/v1/users/${user.spotifyId}/playlists`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: "Everyone's recommendation",
            public: false,
            collaborative: false,
            description: "Here is a playlist I made from everyone's recommendations",
        })
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        addItemsToPlaylist(data.id);
    }).catch((err) => {
        console.log(err);
    });
  }

  const addItemsToPlaylist = (playlistId: string) => {
      console.log(uris)
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({
            uris: uris
        })
      }).then((res) => {
          return res.json();
      }).then((data) => {
          console.log(data);
          if (!data.status) {
            setPlaylistItems([]);
            setIsCreated(true); 
          }
          
      }).catch((err: Error) => {
          console.log(err);
      });
  }

  return (
    <>
        <CreateBtn onClick={() => onClick()}>プレイリスト作成</CreateBtn>
        <Container>
            {playlistItems.map((item) => (
                <PlaylistItem img={item.img} artsitName={item.artsitName} songName={item.songName} spotifyId={item.spotifyId} />
            ))}
            {isCreated && (
                <p style={{color: "#fff", textAlign: "center"}}>プレイリストを作成しました</p>
            )}
        </Container>
    </>
    
  )
}

const Container = styled.div`
  margin: 25px 55px;
  height: 30%;
  overflow-y: scroll;
`;

const CreateBtn = styled.button`
    border: none;
    cursor: pointer;
    color: #fff;
    background-color: #000;
    width: 73%;
    border-radius: 30px;
    transition: .2s;
    margin-left: 55px;

    &:hover {
        background-color: #222;
    }
`;

export default Playlist