import { CommonModule } from '@angular/common';
import { {{ .NameCamelCase }}Service } from '{{ .ServicePathImport }}/{{ .Name }}.service';
import { MVCommonsUtilsModule, MVCommonsErrorHandler, 
         MVCommonsFormValidateModule, MVCommonsDropdownModule,
         MVCommonsGridModule, MVCommonsPainelAdminitradorModule } from 'mvcommons-ng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { {{ .NameCamelCase }}Component } from './{{ .Name }}.component';
import { {{ .NameCamelCase }}FormComponent } from './{{ .Name }}-form.component';
import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { {{ .NameCamelCase }}RoutingModule } from './{{ .Name }}-routing.module';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TableModule } from 'primeng/components/table/table';
import { ButtonModule } from 'primeng/components/button/button';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { PanelModule } from 'primeng/components/panel/panel';
import { CheckboxModule } from 'primeng/primeng';

@NgModule({

    imports: [
        MVCommonsFormValidateModule,
        ReactiveFormsModule,
        TooltipModule,
        FormsModule,
        {{ .NameCamelCase }}RoutingModule,
        CommonModule,
        TableModule,
        InputTextModule,
        PanelModule,
        MVCommonsDropdownModule,
        MVCommonsUtilsModule,
        MVCommonsGridModule,
        DialogModule,
        RadioButtonModule,
        ButtonModule,
        ConfirmDialogModule,
        CheckboxModule,
        MVCommonsPainelAdminitradorModule    
    ],
    declarations: [ {{ .NameCamelCase }}Component, {{ .NameCamelCase }}FormComponent ],
    exports: [ {{ .NameCamelCase }}Component ],
    providers: [
        {{ .NameCamelCase }}Service,
        MVCommonsErrorHandler
    ],
})
 
export class {{ .NameCamelCase }}Module { }