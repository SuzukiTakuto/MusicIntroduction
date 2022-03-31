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
  return (
    <Container>
        <ProfileTop>
            <ProfileIcon img={'iconPath'} />
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
    justify-content: space-between;
    border-bottom: 1px solid #000;
`;

type ImgProps = {
    img: string
};

const ProfileIcon = styled.div<ImgProps>`
    background-image: ${props => `url(${props.img})`};
`;

const Username = styled.p`
    font-size: 48px;
`;

export default Profile