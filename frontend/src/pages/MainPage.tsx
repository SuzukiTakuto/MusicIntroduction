import React, { useState, useEffect } from 'react';
import Profile from '../components/Profile';
import TimeLine from '../components/TimeLine';
import Search from '../components/Search';
import styled from 'styled-components';

const MainPage = () => {

  return (
    <Wrapper>
      <Profile />
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