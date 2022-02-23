import { MessageUtilService } from 'mvcommons-ng';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { {{ .NameCamelCase }} } from '{{ .ModelPathImport }}/{{ .Name }}';
import { {{ .NameCamelCase }}Service } from '{{ .ServicePathImport }}/{{ .Name }}.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: '{{ .Name }}',
    templateUrl: './{{ .Name }}.component.html',
    styleUrls: ['./{{ .Name }}.component.scss']
})
export class {{ .NameCamelCase }}Component implements OnInit {

  list{{ .NameCamelCase }}s: {{ .NameCamelCase }}[] = [];
  dto: {{ .NameCamelCase }};
  dtoSelecionado: {{ .NameCamelCase }};
  display: boolean = false;
  formFilter: FormGroup;

  constructor(
      private service: {{ .NameCamelCase }}Service,
      private messageService: MessageUtilService,
      private confirmService: ConfirmationService,
      private router: Router,
      private formBuilder: FormBuilder
  ) {
    this.formFilter = this.formBuilder.group({
      {{range $i, $field := .FieldsArray }}{{$field}}: [null],
      {{end}}
    });
  }

  ngOnInit() {
    
  }

  listar() {
    this.service.list{{ .NameCamelCase }}()
    .subscribe((list) => {
      this.list{{ .NameCamelCase }}s = list;
    })
  }

  novo() {
    this.dtoSelecionado = new {{ .NameCamelCase }}();
    this.display = true;
  }

  editar(dto: {{ .NameCamelCase }}) {
    this.dtoSelecionado = new {{ .NameCamelCase }}(dto)
    this.display = true;
  }

  excluir() {
    this.confirmService.confirm({
      message: 'Confirma exclusão do registro ?',
      header: 'Excluir registro',
      acceptLabel: 'Sim',
      rejectLabel: 'Não' ,
      accept: () => {
        this.service.deletar(this.dtoSelecionado.id)
            .subscribe(() => {
              this.dtoSelecionado = null;
              this.messageService.showMessageSuccess('Operação realizada com sucesso!', 'Mensagem', true);
            });
      }
    });
  }

  onSave(event) {
    this.listar();
    this.display = false;
    this.dtoSelecionado = null;
  }

  limparCamposNovo() {
    this.dtoSelecionado = null;
    this.list{{ .NameCamelCase }}s = [...this.list{{ .NameCamelCase }}s];
  }

  limparBusca() {
    this.formFilter.reset();
    this.dtoSelecionado = null;
    this.listar();
  }

  onEventoSelecao(selecao: {{ .NameCamelCase }}) {
    this.dtoSelecionado = selecao;
  }

  onEventoDesselecao() {
    this.dtoSelecionado = null;
  }



}
