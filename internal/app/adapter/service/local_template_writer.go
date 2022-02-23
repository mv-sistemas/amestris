package service

import (
	"bufio"
	"bytes"
	"fmt"
	"html/template"
	"os"
	"path/filepath"
	"strings"

	"github.com/mvsp/amestris/internal/app/domain"
	"github.com/mvsp/amestris/utils"
	"github.com/rs/zerolog/log"
)

/**
* This service handles local the write of the template on local file system
**/
type LocalTemplateWriter struct{}

func (l *LocalTemplateWriter) Write(template *domain.Template) {
	for fileName, data := range template.Files {
		path := strings.ReplaceAll(fileName, template.Source, template.Dest)
		newItem := prepareDirFromTemplate(path, template.Variables)
		file, err := os.Create(newItem)
		if err != nil {
			utils.ExitOnError(fmt.Sprintf("failed to create file %s", newItem), err)
		} else {
			absolutePath, _ := filepath.Abs(newItem)
			log.Info().Msg(fmt.Sprintf("creating item: %s", absolutePath))
			l.writeTemplateContent(file, data, fileName, template.Variables)
		}
	}

}

func (*LocalTemplateWriter) writeTemplateContent(file *os.File, data string, fileName string, properties interface{}) {
	writer := bufio.NewWriter(file)
	ut, err := template.New("temp").Funcs(templateFunctions()).Parse(data)
	if err != nil {
		utils.ExitOnError(fmt.Sprintf("failed to create item from template: %s", fileName), err)
	}
	err = ut.Execute(writer, properties)
	if err != nil {
		utils.ExitOnError(fmt.Sprintf("failed to create item from template: %s", fileName), err)
	} else {
		writer.Flush()
	}
}

func prepareDirFromTemplate(item string, properties interface{}) string {
	buffer := bytes.NewBufferString("")
	itemTemplate, err := template.New("item").Parse(item)
	errorMessage := fmt.Sprintf("failed to create project item: %s", item)
	if err != nil {
		utils.ExitOnError(errorMessage, err)
	}
	err = itemTemplate.Execute(buffer, properties)
	if err != nil {
		utils.ExitOnError(errorMessage, err)
	}
	newItem := buffer.String()
	utils.EnsureDirFromFile(newItem)
	return newItem
}

func templateFunctions() template.FuncMap {
	return template.FuncMap{
		"label": label,
	}
}

func label(label string) string {
	return strings.Title(label)
}
