import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { IonicPage, NavController, Platform, ToastController, ViewController, NavParams } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { FormGroup } from '@angular/forms/src/model';
import { Storage } from '@ionic/storage';

// Business
import { basePage } from '../../business/architecture/basePage';

// Services
import { AuthService } from '../../providers/auth-service';
import { ValidatorService } from '../../providers/validator-service';
import { ApiClientService } from '../../business/_services/swagger';
import { HomePage } from '../home/home';

@Component({
    selector: 'fields-user-page',
    templateUrl: 'fields.html',
})
export class FieldsPage extends basePage {

    public frm: FormGroup;
    private navCtrl: NavController;
    private oUser: any;
    private token;
    private title:string;

    constructor(
        navCtrl: NavController,
        frmBuilder: FormBuilder,
        loadingCtrl: LoadingController,
        alertCtrl: AlertController,
        toastCtrl: ToastController,
        public authService: AuthService,
        public _validator: ValidatorService,
        public viewCtrl: ViewController,
        private _apiClient: ApiClientService,    
        private storage: Storage,            
        params: NavParams
    ) {
        /** pasa variables al constructor padre */
        super(toastCtrl, loadingCtrl, alertCtrl);
        /** extrae el token de la sesion */
        this.storage.get("token").then(token => {
            this.token = token;
        });
        /** obtiene datos de un usuario */
        this.oUser = params.get('oUser');
        this.title = this.oUser ? 'Modificar usuario' : 'Registrar usuario nuevo';
        // construye el formulario
        this.form(frmBuilder);        
    }

    /** construye el formulario */
    form(frmBuilder) {
        /** Construye un formBuilder con sus validaciones para los input en la vista */
        this.frm = frmBuilder.group({
            _id: [null],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', this.oUser ? Validators.compose([Validators.minLength(6)]) : Validators.compose([Validators.required, Validators.minLength(6)])],
            name: ['', Validators.compose([Validators.required])],
            lastname: ['', Validators.compose([Validators.required])],
            username: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        })

        // verifica si hay datos de un usuario
        if (this.oUser) {
            // si hay datos se crea la propiedad password
            this.oUser.password = '';
            // se eliminan las propiedades del objeto
            delete this.oUser.created_at;
            delete this.oUser.updated_at;
            // asigna los datos del usuario al formulario
            this.frm.setValue(this.oUser);
        }
    }

    /** Click en Guardar */
    submit() {
        // verifica que el formulario sea correcto
        this._validator.validateFields(this.frm);
        // si es válido el formulario crea o actualiza al usuario
        if (this.frm.valid) this.oUser ? this.update() : this.create();        
    }

    /** Registra un usuario */
    create() {
        // consume el servicio con el token y los datos del usuario
        this._apiClient.createUser(this.token, this.frm.value)
            .subscribe(
                data => {
                    // cierra el modal y pasa los datos a la vista anterior
                    this.viewCtrl.dismiss(data);
                },
                error => {
                    console.log(error)
                }
            );
    }

    /** Modifica un usuario */
    update() {

        // verifica si el campo de contraseña contiene algo
        if (!this.frm.get('password').value) delete this.frm.value.password;

        // consume el servicio con el token y los datos del usuario
        this._apiClient.updateUser(this.token, this.frm.value)
            .subscribe(
                data => {
                    // cierra el modal y pasa los datos a la vista anterior
                    this.viewCtrl.dismiss(data);
                },
                error => {
                    console.log(error)
                }
            );
    }
    
    /** Cierra el modal */
    dismiss() {
        this.viewCtrl.dismiss();        
    }

}
