package utils

import (
	"os"
	"runtime"
	"strings"

	"github.com/rs/zerolog/log"
)

func EnsureDirFromFile(filename string) error {
	lastSlash := -1
	if runtime.GOOS == "windows" {
		lastSlash = strings.LastIndex(filename, "\\")
	} else {
		lastSlash = strings.LastIndex(filename, "/")
	}
	if lastSlash < 0 {
		return nil
	}
	dirName := filename[0:lastSlash]
	err := os.MkdirAll(dirName, 0755)

	if err == nil || os.IsExist(err) {
		return nil
	} else {
		log.Err(err).Send()
		return err
	}
}
