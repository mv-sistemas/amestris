package service

import "github.com/mv-sistemas/amestris/internal/app/domain"

type ITemplateReader interface {
	Read(path string) *domain.Template
}

type ITemplateWriter interface {
	Write(template *domain.Template)
}
