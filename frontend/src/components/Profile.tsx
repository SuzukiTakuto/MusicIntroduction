import React from 'react';
import styled from 'styled-components';
import PostList from '../subComponents/PostList';

type Props = {
    userId: string,
    username: string,
    email: string,
    iconImg: string
}

const Profile = (props: Props) => {
    console.log(props);
  return (
    <Container>
        <ProfileTop>
            <ProfileIcon img={props.iconImg} />
            <Username>{props.username}</Username>
        </ProfileTop>
        <PostList />
    </Container>
  )
}

const Container = styled.div`
    width: 23.2804%;
    height: calc(100vh - 62px);
    background-color: #fff;
    border-radius: 20px;
`;

const ProfileTop = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #000;
`;

type ImgProps = {
    img: string
};

const ProfileIcon = styled.div<ImgProps>`
    width: 46.6%;
    padding-top: 46.6%;
    border-radius: 50%;
    background-image: ${props => `url(${props.img})`};
`;

const Username = styled.p`
    font-size: 48px;
`;

export default Profile