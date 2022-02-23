import { OnInit, EventEmitter, Output, Input, Component } from '@angular/core';
import { Test } from '../../model/test';
import { TestService } from '../../service/test.service';
import { FormGroup, FormBuilder, } from '@angular/forms';
import { MessageUtilService, ValidateUtil } from 'mvcommons-ng';
import { mergeMap } from 'rxjs/operators';

@Component({
    selector: 'test-form',
    templateUrl: './test-form.component.html',
    styleUrls: ['./test-form.component.scss']
  })
  export class TestFormComponent implements OnInit {
  
    @Output() eventOnSave: EventEmitter<any> = new EventEmitter<any>();
    @Input() dto: Test;
  
    form: FormGroup;
    
    constructor(
      private fb: FormBuilder,
      private messageService: MessageUtilService,
      private validateUtil: ValidateUtil,
      private service: TestService
    ) { 
      this.form = this.fb.group({
        id: [null],
        name: [null],
        
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
  