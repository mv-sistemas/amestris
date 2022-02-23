package service

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/mv-sistemas/amestris/internal/app/domain"
)

/**
* This service handles local templates on OS file system
 */
type LocalTemplateReader struct{}

func (l *LocalTemplateReader) Read(templatePath string) *domain.Template {
	path, _ := filepath.Abs(templatePath)
	files, directories := computeFiles(path)
	variables := computeVariables(files)
	result := &domain.Template{
		Source:      path,
		Files:       files,
		Variables:   variables,
		Directories: directories,
	}
	return result
}

func computeFiles(source string) (map[string]string, map[string]string) {
	files := map[string]string{}
	dirs := map[string]string{}
	filepath.Walk(source, func(path string, info fs.FileInfo, err error) error {
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
			os.Exit(1)
		}
		if !info.IsDir() {
			file, err := os.ReadFile(path)
			if err != nil {
				fmt.Fprintln(os.Stderr, err)
				os.Exit(1)
			}
			files[path] = string(file)
		} else if path != source {
			dirs[path] = ""
		}
		return nil
	})
	return files, dirs
}

func computeVariables(files map[string]string) map[string]interface{} {
	result := map[string]interface{}{}
	re := regexp.MustCompile(`(?m){{(\s|.*)(?P<field>\.[a-zA-Z]+) }}`)
	for key, value := range files {
		content := key + "\n" + value
		names := re.SubexpNames()
		indexOfField := index(names, "field")
		matches := re.FindAllStringSubmatch(content, -1)

		for _, n := range matches {
			field := n[indexOfField]
			field = strings.Replace(field, ".", "", 1)
			result[field] = ""
		}
	}
	return result
}

func index(slice []string, item string) int {
	for i := range slice {
		if slice[i] == item {
			return i
		}
	}
	return -1
}
