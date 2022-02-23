/**
 * Auto generated class, please change it to your convenience
 */
export class {{ .NameCamelCase }} {

  {{range $i, $field := .FieldsArray }}
  /**
   * Auto generated field, please change it to your convenience
   */
  public {{$field}}: any;
  {{end}}

  constructor(init?: Partial<{{ .NameCamelCase }}>) {
    Object.assign(this, init);
  }
}