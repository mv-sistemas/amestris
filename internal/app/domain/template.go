package domain

type Template struct {
	Source      string
	Dest        string
	Variables   map[string]interface{}
	Files       map[string]string
	Directories map[string]string
}
