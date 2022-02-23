package main

import (
	"os"

	"github.com/mvsp/amestris/internal/app/adapter/controller"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

var version = "undefined"

func main() {
	controller.ExecuteCommand(version)
}

func init() {
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
}
