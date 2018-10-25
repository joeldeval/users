import { Component } from '@angular/core';
import { NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ApiClientService } from '../../business/_services/swagger';
import { LoginPage } from '../login/login';
import { basePage } from '../../business/architecture/basePage';
import { Storage } from '@ionic/storage';
import { UserResponse } from '../../business/_services/swagger/models';

import { ModalController } from 'ionic-angular';
import { FieldsPage } from '../user/fields';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends basePage {
  
  public lstItems: UserResponse[];

  constructor(public navCtrl: NavController, 
              public authService: AuthService,
              private _apiClient: ApiClientService,
              private storage: Storage,
              public modalCtrl: ModalController,
              loadingCtrl: LoadingController,
              alertCtrl: AlertController,
              toastCtrl: ToastController) 
  {
    super(toastCtrl, loadingCtrl, alertCtrl);
    // obtiene todos los usuarios
    this.getUsers();
  }

  /** Obtiene los registros de usuarios de la API */
  getUsers() {
    // extrae el token de la sesion
    this.storage.get("token").then(token => {
      // consume el servicio con el token
      this._apiClient.user(token).subscribe(data => {    
          // asigna los registros a una lista      
          this.lstItems = data.body.users;
        },
      error => {
        console.log(error)
      });
    });
  }

  /** muestra un modal con su formulatio para el registro de un usuario */
  showAdd() {
    // crea el componente
    const modal = this.modalCtrl.create(FieldsPage);
    // espera a cerra el modal
    modal.onDidDismiss(data => {
      // obtiene todos los usuarios
      this.getUsers();
    })
    // muestra el componente
    modal.present();
  }

  /** muestra un modal con su formulario para actualizar un usuario */
  showEdit(o) {
    // crea el componente
    const modal = this.modalCtrl.create(FieldsPage, { oUser: o});
    // espera a cerra el modal
    modal.onDidDismiss(data => {
      // obtiene todos los usuarios
      this.getUsers();
    })
    // muestra el componente
    modal.present();
  }

  /** muestra un Confirm para eliminar el usuario */
  showDelete(o) {
    // muestra el confirm
    this.showConfirm('¡Eliminar!', '¿Estás seguro de eliminar el usuario: '+o.name+'?', 'Eliminar', () => {
      // extrae el token de la sesion
      this.storage.get("token").then(token => {
        // consume el servicio con el token
        this._apiClient.deleteUser(token,o._id).subscribe(data => {
          // obtiene todos los usuarios
          this.getUsers();
        },
        error => {
          console.log(error)
        });
      });
    }); 
  }

  /** Cierra sesion */
  public logout() {
    // elimina los datos de la sesion
    this.authService.logout();
    // regresa a la pantalla de login
    this.navCtrl.setRoot(LoginPage);
  }
}
