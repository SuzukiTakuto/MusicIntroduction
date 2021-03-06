package models

type User struct {
	UserId   string `json:"userId" bson:"userId"`
	Username string `json:"username" bson:"username"`
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
	IconImg  string `json:"iconImg" bson:"iconImg"`
}

type LoginUser struct {
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
}
