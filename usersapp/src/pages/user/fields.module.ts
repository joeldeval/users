import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FieldsPage } from './fields';
import { FieldErrorDisplayModule } from '../../business/components/validate-form/field-error-display.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FieldsPage,
  ],
  imports: [
    FieldErrorDisplayModule,
    FormsModule,
    IonicModule
  ],
})
export class FieldsPageModule {}
