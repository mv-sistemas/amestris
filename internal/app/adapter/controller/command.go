package controller

import (
	"fmt"
	"os"
	"strings"

	"github.com/manifoldco/promptui"
	"github.com/mv-sistemas/amestris/internal/app/adapter/service"
	"github.com/mv-sistemas/amestris/internal/app/application/usecase"
	"github.com/mv-sistemas/amestris/internal/app/domain"
	"github.com/mv-sistemas/amestris/utils"
	"github.com/spf13/cobra"
)

const CAMEL_CASE = "CamelCase"

func ExecuteCommand(version string) {
	main := &cobra.Command{
		Use:   "amestris",
		Short: "An MV tool to simplify template generation",
		Run:   defaultRun,
	}
	main.Version = version
	main.Flags().StringP("template", "t", "", "Path to template")
	main.MarkFlagRequired("template")
	if err := main.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func defaultRun(cmd *cobra.Command, args []string) {
	path, _ := cmd.Flags().GetString("template")
	if path != "" {
		service := getDefaultTemplateService()
		template := service.Read(path)
		fmt.Println("Answer the following questions to change template parameters:")
		queryTemplateDestination(template)
		queryTemplateVariables(template)
		service.Write(template)
		return
	}
	cmd.Help()
}

func getDefaultTemplateService() *usecase.TemplateUseCases {
	reader := service.LocalTemplateReader{}
	writer := service.LocalTemplateWriter{}
	service := usecase.NewTemplate(&reader, &writer)
	return service
}

func queryTemplateDestination(template *domain.Template) {
	prompt := promptui.Prompt{
		Label: "What is the root dir of template destination?",
	}
	result, err := prompt.Run()
	if err != nil {
		utils.ExitOnError("", err)
	}
	template.Dest = result
}

func queryTemplateVariables(template *domain.Template) {
	camelcases := []string{}
	for key, _ := range template.Variables {
		if strings.Contains(key, "CamelCase") {
			camelcases = append(camelcases, key)
			continue
		}
		prompt := promptui.Prompt{
			Label: key,
		}
		result, err := prompt.Run()
		if err != nil {
			utils.ExitOnError("", err)
		}
		template.Variables[key] = result
		if strings.Contains(key, "Array") {
			template.Variables[key] = handleArrays(result)
		}
	}
	handleCamelCases(camelcases, template)

}

func handleArrays(commaSeparatedString string) []string {
	return strings.Split(commaSeparatedString, ",")
}

func handleCamelCases(camelcases []string, template *domain.Template) {
	for _, camelCaseKey := range camelcases {
		key := strings.ReplaceAll(camelCaseKey, CAMEL_CASE, "")
		value := fmt.Sprintf("%v", template.Variables[key])
		if value == "" {
			utils.ExitWithMessage(fmt.Sprintf("couldn't find value for key %v referencing the camel case key %v, check your template and try again.", key, camelCaseKey))
		}
		camelCaseValue := utils.ToCamelCase(value)
		template.Variables[camelCaseKey] = camelCaseValue
	}
}
