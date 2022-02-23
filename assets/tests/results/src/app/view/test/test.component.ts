import { MessageUtilService } from 'mvcommons-ng';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Test } from '../../model/test';
import { TestService } from '../../service/test.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  listTests: Test[] = [];
  dto: Test;
  dtoSelecionado: Test;
  display: boolean = false;
  formFilter: FormGroup;

  constructor(
      private service: TestService,
      private messageService: MessageUtilService,
      private confirmService: ConfirmationService,
      private router: Router,
      private formBuilder: FormBuilder
  ) {
    this.formFilter = this.formBuilder.group({
      id: [null],
      name: [null],
      
    });
  }

  ngOnInit() {
    
  }

  listar() {
    this.service.listTest()
    .subscribe((list) => {
      this.listTests = list;
    })
  }

  novo() {
    this.dtoSelecionado = new Test();
    this.display = true;
  }

  editar(dto: Test) {
    this.dtoSelecionado = new Test(dto)
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
    this.listTests = [...this.listTests];
  }

  limparBusca() {
    this.formFilter.reset();
    this.dtoSelecionado = null;
    this.listar();
  }

  onEventoSelecao(selecao: Test) {
    this.dtoSelecionado = selecao;
  }

  onEventoDesselecao() {
    this.dtoSelecionado = null;
  }



}
