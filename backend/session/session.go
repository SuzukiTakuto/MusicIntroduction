package session

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/sessions/cookie"
)

store := cookie.NewStore([]byte("secret"))