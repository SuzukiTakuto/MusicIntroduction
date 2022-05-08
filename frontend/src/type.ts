export type LoginUser = {
    username: string,
    email: string,
    password: string,
    iconImg: string,
};

export type User = {
    username: string,
    email: string,
    userId: string,
    iconImg: string,
    spotifyId: string
}

export type Limit = {
    x: number,
    y: number,
};

export type SongData = {
    img: string,
    songName: string,
    artsitName: string,
    spotifyId: string,
}

export type Post = {
    albumImg: string,
    songName: string,
    artistName: string,
    spotifyId: string,
}

export type PostData = {
    postId: string,
    userId: string,
    songname: string,
    artistname: string,
    albumImg: string,
    comment: string,
    userIconImg: string,
    username: string,
    spotifyId: string,
    date: string
}