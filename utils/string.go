package utils

import (
	"strings"
	"unicode"
	"unicode/utf8"
)

func ToCamelCase(kebab string) (camelCase string) {
	isToUpper := true
	for _, runeValue := range kebab {
		if isToUpper {
			camelCase += strings.ToUpper(string(runeValue))
			isToUpper = false
		} else {
			if runeValue == '-' {
				isToUpper = true
			} else {
				camelCase += string(runeValue)
			}
		}
	}
	return
}

func LowerFirst(s string) string {
	if s == "" {
		return ""
	}
	r, n := utf8.DecodeRuneInString(s)
	return string(unicode.ToLower(r)) + s[n:]
}
