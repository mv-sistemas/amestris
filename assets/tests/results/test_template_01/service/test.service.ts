import { Injectable } from '@angular/core';
import { AuthorizationService } from 'controle-acesso-ng';
import { MVCommonsGenericService, URLSearchParamsBuilder } from 'mvcommons-ng';
import { Observable } from 'rxjs';
import { Test } from 'model/test';
import { map } from 'rxjs/operators';

@Injectable()
export class TestService extends MVCommonsGenericService {

      constructor(http: AuthorizationService) {
          super(http, 'test/');
      }
      
      public listTest(): Observable&lt;Test[]> {
          return this.get('').pipe(map(resposta => resposta.json()));
      }
      
      public salvar(dto: Test): Observable<any> {
        return this.post('', dto).pipe(map(res => res.json()));
      }

      public deletar(id: number): Observable<void> {
        return this.delete('', id);
      }

}
