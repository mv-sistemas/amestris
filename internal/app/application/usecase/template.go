package usecase

import (
	"github.com/mvsp/amestris/internal/app/application/service"
	"github.com/mvsp/amestris/internal/app/domain"
)

type TemplateUseCases struct {
	reader service.ITemplateReader
	writer service.ITemplateWriter
}

func NewTemplate(reader service.ITemplateReader, writer service.ITemplateWriter) *TemplateUseCases {
	return &TemplateUseCases{
		reader: reader, writer: writer,
	}
}

func (t *TemplateUseCases) Read(path string) *domain.Template {
	return t.reader.Read(path)
}

func (t *TemplateUseCases) Write(template *domain.Template) {
	t.writer.Write(template)
}
