import React from 'react'
import styled from 'styled-components';

const Post = () => {
  return (
    <Container>
        <MusicInfo>
            <AlbumImg img={'imgPath'} />
            <MusicTitle>
                <Title>
                    Train
                </Title>
                <Artist>
                    Chris Potter
                </Artist>
            </MusicTitle>
        </MusicInfo>
        <Comment>
            サンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプル
        </Comment>
    </Container>
  )
}

const Container = styled.div`
    width: 85.6363%;
    margin: 0 auto 20px;
    padding: 10px;
    background-color: rgba(238, 238, 240, 0.6);
    border-radius: 10px;
`;

const MusicInfo = styled.div`
    display: flex;
`;

type Props = {
    img: string
};

const AlbumImg = styled.div<Props>`
    background-image: ${props => `url(${props.img})`};
    width: 69px;
    height: 69px;
    margin-right: 20px;
`;

const MusicTitle = styled.div`
    text-align: center;
`;

const Title = styled.p`
    font-size: 24px;
    margin: 0;
`;

const Artist = styled.p`
    font-size: 18px;
    margin: 0;
`;

const Comment = styled.p`
    font-size: 12px;
`;

export default Post;