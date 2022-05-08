import { createContext } from "react";
import { Post, User, SongData } from "./type";

export const Context = createContext({} as {
    postInput: boolean,
    setPostInput: React.Dispatch<React.SetStateAction<boolean>>,
    postData: Post,
    setPostData: React.Dispatch<React.SetStateAction<Post>>,
    user: User,
    isUpdate: boolean,
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>,
});

export const PlaylistContext = createContext({} as {
    playlistItems: SongData[],
    setPlaylistItems: React.Dispatch<React.SetStateAction<SongData[]>>,
    uris: string[],
    setUris: React.Dispatch<React.SetStateAction<string[]>>,
    isCreated: boolean,
    setIsCreated: React.Dispatch<React.SetStateAction<boolean>>,
})