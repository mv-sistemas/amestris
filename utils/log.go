package utils

import (
	"os"

	"github.com/rs/zerolog/log"
)

func ExitOnError(message string, err error) {
	log.Error().AnErr("cause", err).Msg(message)
	os.Exit(1)
}

func ExitWithMessage(message string) {
	log.Warn().Msg(message)
	os.Exit(1)
}
