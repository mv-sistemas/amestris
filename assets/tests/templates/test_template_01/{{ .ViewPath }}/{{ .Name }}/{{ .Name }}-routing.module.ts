import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { {{ .NameCamelCase }}Component } from './{{ .Name }}.component';

const routes: Routes = [
  { path: '', component: {{ .NameCamelCase }}Component },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class {{ .NameCamelCase }}RoutingModule { }
