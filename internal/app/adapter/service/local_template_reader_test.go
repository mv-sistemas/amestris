package service

import (
	"fmt"
	"path/filepath"
	"reflect"
	"testing"

	"github.com/mv-sistemas/amestris/internal/app/domain"
)

func TestLocalTemplateReader(t *testing.T) {
	template1Path := "../../../../assets/tests/templates/test_template_01"
	path, _ := filepath.Abs(template1Path)
	template1 := &domain.Template{
		Source: path,
		Variables: map[string]interface{}{
			"Name": "", "ModelPath": "",
			"ServicePath": "", "ViewPath": "",
			"FieldsArray": "", "NameCamelCase": "",
			"ServicePathImport": "", "ModelPathImport": "",
		},
	}

	assertCorrectTemplate := func(t *testing.T, got, want *domain.Template) {
		t.Helper()
		if got.Source != want.Source {
			t.Errorf("got %v want %v", got.Source, want.Source)
		}
		if !reflect.DeepEqual(got.Variables, want.Variables) {
			t.Errorf("got %v want %v", got.Variables, want.Variables)
		}
		if len(got.Files) != 10 {
			t.Errorf("got %v want 10", len(got.Files))
		}

	}

	t.Run("assert that the template is read from file system", func(t *testing.T) {
		service := &LocalTemplateReader{}
		got := service.Read(template1Path)
		fmt.Println(got.Directories)
		assertCorrectTemplate(t, got, template1)
	})
}
