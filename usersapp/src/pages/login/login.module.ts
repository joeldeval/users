import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { FieldErrorDisplayModule } from '../../business/components/validate-form/field-error-display.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    FormsModule,
    FieldErrorDisplayModule,
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
