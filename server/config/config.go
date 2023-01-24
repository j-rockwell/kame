package config

import (
	"fmt"
	"github.com/BurntSushi/toml"
	"os"
)

type Configuration struct {
	Gin   Gin   `toml:"gin"`
	Auth  Auth  `toml:"auth"`
	Redis Redis `toml:"redis"`
	Mongo Mongo `toml:"mongo"`
}

type Gin struct {
	Port    string   `toml:"port"`
	Mode    string   `toml:"mode"`
	Origins []string `toml:"origins"`
}

type Auth struct {
	AccessTokenPubkey  string `toml:"access_token_pubkey"`
	AccessTokenTTL     int64  `toml:"access_token_ttl"`
	RefreshTokenPubkey string `toml:"refresh_token_pubkey"`
	RefreshTokenTTL    int64  `toml:"refresh_token_ttl"`
}

type Redis struct {
	Address  string `toml:"address"`
	Password string `toml:"password"`
}

type Mongo struct {
	URI string `toml:"uri"`
}

// Prepare attempts to read a config file located in a www directory and falls back
// to use the default config. If neither file is present at runtime the application
// will panic.
func Prepare() *Configuration {
	f := "www/config.toml"

	if _, err := os.Stat(f); err != nil {
		f = "default_config.toml"
		fmt.Println("unable to read config.toml, skipping and reading defaults")
	}

	var conf Configuration
	_, err := toml.DecodeFile(f, &conf)

	if err != nil {
		panic("failed to decode config file: " + err.Error())
	}

	return &conf
}
