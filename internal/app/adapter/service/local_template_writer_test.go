package service

import (
	"path/filepath"
	"testing"
)

func TestLocalTemplateWriter(t *testing.T) {

	t.Run("assert that the template is read from file system", func(t *testing.T) {
		reader := &LocalTemplateReader{}
		template := reader.Read("../../../../assets/tests/templates/test_template_01")
		template.Variables = map[string]interface{}{
			"Name": "test", "ModelPath": "model",
			"ServicePath": "service", "ViewPath": "view",
			"FieldsArray": []string{"id", "nome", "endereço"}, "NameCamelCase": "Test",
			"ServicePathImport": "service", "ModelPathImport": "model",
		}
		dest, _ := filepath.Abs("../../../../assets/tests/results/test_template_01")
		template.Dest = dest
		writer := &LocalTemplateWriter{}
		writer.Write(template)
	})

}
