import { OnInit, EventEmitter, Output, Input, Component } from '@angular/core';
import { {{ .NameCamelCase }} } from '{{ .ModelPathImport }}/{{ .Name }}';
import { {{ .NameCamelCase }}Service } from '{{ .ServicePathImport }}/{{ .Name }}.service';
import { FormGroup, FormBuilder, } from '@angular/forms';
import { MessageUtilService, ValidateUtil } from 'mvcommons-ng';
import { mergeMap } from 'rxjs/operators';

@Component({
    selector: '{{ .Name }}-form',
    templateUrl: './{{ .Name }}-form.component.html',
    styleUrls: ['./{{ .Name }}-form.component.scss']
  })
  export class {{ .NameCamelCase }}FormComponent implements OnInit {
  
    @Output() eventOnSave: EventEmitter<any> = new EventEmitter<any>();
    @Input() dto: {{ .NameCamelCase }};
  
    form: FormGroup;
    
    constructor(
      private fb: FormBuilder,
      private messageService: MessageUtilService,
      private validateUtil: ValidateUtil,
      private service: {{ .NameCamelCase }}Service
    ) { 
      this.form = this.fb.group({
        {{range $i, $field := .FieldsArray }}{{$field}}: [null],
        {{end}}
      });
    }
  
    ngOnInit() {
      if(this.dto.id){
        this.form.patchValue({...this.dto});
      }
    }
  
    salvar() {
      this.validateUtil
        .validateAndShowMessage(this.form)
        .pipe(mergeMap(() => this.service.salvar(this.form.getRawValue())))
        .subscribe(dados => {
          this.dto = dados;
          this.messageService.showMessageSuccess('Operação realizada com sucesso!', 'Mensagem', true);
          this.form.reset(); 
          this.eventOnSave.emit(dados);  
      });
    }
}
  