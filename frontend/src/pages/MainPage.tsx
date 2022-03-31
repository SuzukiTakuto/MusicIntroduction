import React, { useState, useEffect } from 'react';
import Profile from '../components/Profile';
import TimeLine from '../components/TimeLine';
import Search from '../components/Search';
import styled from 'styled-components';
import { User } from '../type/type';

const MainPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [iconImg, setIconImg] = useState("");

  if (!localStorage.getItem("token")) {
    window.location.href = "http://localhost:3000/login";
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/v1/user/get/", {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
      },
      redirect: 'follow',
    }).then((res) => {
      return res.json();
    }).then((user) => {
      setUserId(user.userId);
      setUsername(user.username);
      setEmail(user.email);
      setIconImg(user.iconImg);
    }).catch(() => {
      console.log("error");
    });
  }, []);

  return (
    <Wrapper>
      <Profile userId={userId} username={username} email={email} iconImg={iconImg} />
      <TimeLine />
      <Search />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 21px 32px;
  background-color: #E1E3E6;
`;

export default MainPage