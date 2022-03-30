package helper

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type User struct {
	UsernameKey string
	EmailKey    string
	jwt.StandardClaims
}

var secret = os.Getenv("SECRET_KEY")

var usernameKey = "username"
var emailKey = "email"
var expKey = "exp"

var lifetime = 30 * time.Minute
var refreshedTime = 30 * time.Minute

func GenerateAllTokens(username string, email string) (string, string, error) {
	now := time.Now()
	userToken := jwt.MapClaims{
		usernameKey: username,
		emailKey:    email,
		expKey:      now.Add(lifetime).Unix(),
	}

	refreshUser := jwt.MapClaims{
		usernameKey: username,
		emailKey:    email,
		expKey:      now.Add(refreshedTime).Unix(),
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, userToken).SignedString([]byte(secret))
	refreshToken, err := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshUser).SignedString([]byte(secret))

	if err != nil {
		log.Panic(err)
		return "", "", nil
	}

	return token, refreshToken, err
}

type Auth struct {
	Username string
	Email    string
}

func Parse_proc(signedString string) (*Auth, error) {
	token, err := jwt.Parse(signedString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return "", fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			//            return "", err.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})

	if err != nil {
		if ve, ok := err.(*jwt.ValidationError); ok {
			if ve.Errors&jwt.ValidationErrorExpired != 0 {
				//                return nil, err.Wrapf(err, "%s is expired", signedString)
				return nil, fmt.Errorf("%s is expired", signedString)
			} else {
				return nil, fmt.Errorf("%s is invalid", signedString)
				//                return nil, err.Wrapf(err, "%s is invalid", signedString)
			}
		} else {
			return nil, fmt.Errorf("%s is invalid", signedString)
			//            return nil, err.Wrapf(err, "%s is invalid", signedString)
		}
	}

	if token == nil {
		return nil, fmt.Errorf("not found token in %s:", signedString)
		//        return nil, err.Errorf("not found token in %s:", signedString)
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, fmt.Errorf("not found claims in %s", signedString)
		//        return nil, err.Errorf("not found claims in %s", signedString)
	}
	username, ok := claims[usernameKey].(string)
	if !ok {
		return nil, fmt.Errorf("not found %s in %s", usernameKey, signedString)
		//        return nil, err.Errorf("not found %s in %s", userIDKey, signedString)
	}
	email, ok := claims[emailKey].(string)
	if !ok {
		return nil, fmt.Errorf("not found %s in %s", emailKey, signedString)
		//        return nil, err.Errorf("not found %s in %s", iatKey, signedString)
	}

	return &Auth{
		Username: username,
		Email:    email,
	}, nil
}
