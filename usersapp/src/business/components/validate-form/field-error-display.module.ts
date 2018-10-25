// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';


import { CommonModule } from '@angular/common';
import { FieldErrorDisplayComponent } from '../../components/validate-form/field-error-display.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        FieldErrorDisplayComponent
    ],
    exports: [
        FieldErrorDisplayComponent
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class FieldErrorDisplayModule { }
