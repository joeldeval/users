import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { FormGroup } from '@angular/forms/src/model';
import { ChangeDetectorRef } from '@angular/core';

// Business
import { basePage } from '../../business/architecture/basePage';
import { ILoginPage } from '../../business/interfaces/ILoginPage';

//PAGES
import { HomePage } from '../home/home';
// Services
import {AuthService} from '../../providers/auth-service';
import { ValidatorService } from '../../providers/validator-service'; 

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends basePage implements ILoginPage {
  
  public frm: FormGroup;
  private navCtrl: NavController;

  // Constructor
  constructor(
              navCtrl: NavController, 
              frmBuilder: FormBuilder,
              loadingCtrl: LoadingController, 
              alertCtrl: AlertController,
              toastCtrl: ToastController,
              public authService: AuthService,
              public _validator: ValidatorService,
              private cdRef: ChangeDetectorRef,
            )
  {
    /** pasa variables al constructor padre */
    super(toastCtrl,loadingCtrl, alertCtrl);
    
    /** construye variables a usar */
    this.navCtrl = navCtrl;
    this.form(frmBuilder);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  form(frmBuilder) {
    /** Construye un formBuilder con sus validaciones para los input en la vista */
    this.frm = frmBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }
  
  /** Inicia sesión desde la vista */
  login() {

      /** muestra un loading de autenticando */
      this.showLoader('Iniciando sesión');
      this._validator.validateFields(this.frm);

      /** Verifica si el formulario cumple con las validaciones */
      if (this.frm.valid) {

        /** si no hay error en el formulario continua con la autentificacion */
        this.authService.login(this.frm.value)
        .then(() => this.redirectToHome())
        .catch(error => {
          this.showAlert('Datos inválidos', 'Tu correo electrónico y/o contraseña son incorrectos, por favor verifica tus datos.');
          this.loading.dismiss();
        });;
        
      } else {
        /** Muestra alerta de completar información en el formulario */
        this.loading.dismiss();
        this.showAlert('Datos inválidos', 'Tu correo electrónico y/o contraseña son incorrectos, por favor verifica tus datos.');

      }
  }

  redirectToHome() {
    // redirecciona a inicio de app
    this.navCtrl.setRoot(HomePage);
  }

}
