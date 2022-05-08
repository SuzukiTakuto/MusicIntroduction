package models

import "time"

type Post struct {
	PostId      string    `json:"postId" bson:"postId"`
	UserId      string    `json:"userId" bson:"userId"`
	SongName    string    `json:"songname" bson:"songname"`
	ArtistName  string    `json:"artistname" bson:"artistname"`
	AlbumImg    string    `json:"albumImg" bson:"albumImg"`
	Comment     string    `json:"comment" bson:"comment"`
	UserIconImg string    `json:"userIconImg" bson:"userIconImg"`
	Username    string    `json:"username" bson:"username"`
	SpotifyId   string    `json:"spotifyId" bson:"spotifyId"`
	Date        time.Time `json:"date" bson:"date"`
}
