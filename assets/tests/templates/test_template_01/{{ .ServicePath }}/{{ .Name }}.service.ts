import { Injectable } from '@angular/core';
import { AuthorizationService } from 'controle-acesso-ng';
import { MVCommonsGenericService, URLSearchParamsBuilder } from 'mvcommons-ng';
import { Observable } from 'rxjs';
import { {{ .NameCamelCase }} } from '{{ .ModelPathImport }}/{{ .Name }}';
import { map } from 'rxjs/operators';

@Injectable()
export class {{ .NameCamelCase }}Service extends MVCommonsGenericService {

      constructor(http: AuthorizationService) {
          super(http, '{{ .Name }}/');
      }
      
      public list{{ .NameCamelCase }}(): Observable<{{ .NameCamelCase }}[]> {
          return this.get('').pipe(map(resposta => resposta.json()));
      }
      
      public salvar(dto: {{ .NameCamelCase }}): Observable<any> {
        return this.post('', dto).pipe(map(res => res.json()));
      }

      public deletar(id: number): Observable<void> {
        return this.delete('', id);
      }

}
