import { CommonModule } from '@angular/common';
import { TestService } from 'service/test.service';
import { MVCommonsUtilsModule, MVCommonsErrorHandler, 
         MVCommonsFormValidateModule, MVCommonsDropdownModule,
         MVCommonsGridModule, MVCommonsPainelAdminitradorModule } from 'mvcommons-ng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { TestComponent } from './test.component';
import { TestFormComponent } from './test-form.component';
import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { TestRoutingModule } from './test-routing.module';
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
        TestRoutingModule,
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
    declarations: [ TestComponent, TestFormComponent ],
    exports: [ TestComponent ],
    providers: [
        TestService,
        MVCommonsErrorHandler
    ],
})
 
export class TestModule { }