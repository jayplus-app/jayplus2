package auth

import (
	"backend/config"
	"backend/models"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	authContracts "backend/contracts/auth"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type Auth struct {
	authContracts.Auth
}

func NewAuth() *Auth {
	return &Auth{
		authContracts.Auth{
			Issuer:             config.JWTIssuer,
			Audience:           config.JWTAudience,
			Secret:             config.JWTSecret,
			AccessTokenExpiry:  config.AccessTokenExpiry,
			RefreshTokenExpiry: config.RefreshTokenExpiry,
			CookieDomain:       config.JWTCookieDomain,
			CookiePath:         config.JWTCookiePath,
			CookieName:         config.JWTCookieName,
		},
	}
}

func (a *Auth) generateSignedTokenPair(user *authContracts.AuthUser) (authContracts.JWTTokenPair, error) {
	if user == nil {
		return authContracts.JWTTokenPair{}, fmt.Errorf("error generating token pair: user is nil")
	}

	// create access token
	accessToken := jwt.New(jwt.SigningMethodHS256)

	accessTokenClaims := accessToken.Claims.(jwt.MapClaims)
	accessTokenClaims["name"] = fmt.Sprintf("%s %s", user.FirstName, user.LastName)
	accessTokenClaims["sub"] = fmt.Sprint(user.ID)
	accessTokenClaims["aud"] = a.Audience
	accessTokenClaims["iss"] = a.Issuer
	accessTokenClaims["iat"] = time.Now().UTC().Unix()
	accessTokenClaims["typ"] = "JWT"
	accessTokenClaims["exp"] = time.Now().UTC().Add(a.AccessTokenExpiry).Unix()

	signedAccessToken, err := accessToken.SignedString([]byte(a.Secret))
	if err != nil {
		return authContracts.JWTTokenPair{}, fmt.Errorf("error signing access token: %w", err)
	}

	// create refresh token
	refreshToken := jwt.New(jwt.SigningMethodHS256)

	refreshTokenClaims := refreshToken.Claims.(jwt.MapClaims)
	refreshTokenClaims["sub"] = fmt.Sprint(user.ID)
	refreshTokenClaims["iat"] = time.Now().UTC().Unix()
	refreshTokenClaims["exp"] = time.Now().UTC().Add(a.RefreshTokenExpiry).Unix()

	signedRefreshToken, err := refreshToken.SignedString([]byte(a.Secret))
	if err != nil {
		return authContracts.JWTTokenPair{}, fmt.Errorf("error signing refresh token: %w", err)
	}

	return authContracts.JWTTokenPair{
		AccessToken:  signedAccessToken,
		RefreshToken: signedRefreshToken,
	}, nil
}

func (a *Auth) getRefreshCookie(refreshToken string) *http.Cookie {
	return &http.Cookie{
		Name:     a.CookieName,
		Value:    refreshToken,
		Path:     a.CookiePath,
		Expires:  time.Now().UTC().Add(a.RefreshTokenExpiry),
		MaxAge:   int(a.RefreshTokenExpiry.Seconds()),
		SameSite: http.SameSiteStrictMode,
		Domain:   a.CookieDomain,
		HttpOnly: true,
		Secure:   true,
	}
}

func (a *Auth) getExpiredRefreshCookie() *http.Cookie {
	return &http.Cookie{
		Name:     a.CookieName,
		Value:    "",
		Path:     a.CookiePath,
		Expires:  time.Unix(0, 0),
		MaxAge:   -1,
		SameSite: http.SameSiteStrictMode,
		Domain:   a.CookieDomain,
		HttpOnly: true,
		Secure:   true,
	}

}

func passwordMatches(user *models.User, password string) (bool, error) {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		switch {
		case errors.Is(err, bcrypt.ErrMismatchedHashAndPassword):
			return false, nil
		default:
			return false, err
		}
	}

	return true, nil
}

func (a *Auth) getHeaderFromTokenAndVerify(w http.ResponseWriter, r *http.Request) (string, *authContracts.JWTClaims, error) {
	w.Header().Add("Vary", "Authorization")

	authorizationHeader := r.Header.Get("Authorization")
	if authorizationHeader == "" {
		return "", nil, errors.New("missing Authorization header")
	}

	headerParts := strings.Split(authorizationHeader, " ")
	if len(headerParts) != 2 {
		return "", nil, errors.New("invalid Authorization header")
	}

	if headerParts[0] != "Bearer" {
		return "", nil, errors.New("invalid Authorization header")
	}

	token := headerParts[1]

	claims := &authContracts.JWTClaims{}
	_, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (any, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(a.Secret), nil
	})
	if err != nil {
		if strings.HasPrefix(err.Error(), "token is expired by") {
			return "", nil, errors.New("token is expired")
		}
		return "", nil, err
	}

	if claims.Issuer != a.Issuer {
		return "", nil, errors.New("invalid token issuer")
	}

	return token, claims, nil
}