import React from 'react';
import styled from 'styled-components';
import PostList from '../subComponents/PostList';
import { User } from '../type';

type Props = {
    user: User,
}

const Profile = (props: Props) => {
  const user = props.user;
  return (
    <Container>
        <ProfileIcon src={user.iconImg} />
        <Username>{user.username}</Username>
    </Container>
  )
}

const Container = styled.div`
    position: absolute;
    display: flex;
    top: 18px;
    right: 18px;
    z-index: 10;
`;

const ProfileIcon = styled.img`
    width: 40px;
    border-radius: 50%;
    margin-right: 20px;
`;

const Username = styled.p`
    font-size: 32px;
    color: #fff;
    margin: 0;
`;

export default Profile