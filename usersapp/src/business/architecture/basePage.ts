
import { Alert } from 'ionic-angular/components/alert/alert';
import { Loading } from 'ionic-angular/components/loading/loading';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';
import { IBasePage } from '../../business/interfaces/IBasePage'

export class basePage implements IBasePage {

    public loadingCtrl: LoadingController;
    public alertCtrl: AlertController;
    public loading: Loading;
    public alert: Alert;
    public confirm: Alert;
    public toastCtrl:ToastController

    constructor(toastCtrl: ToastController, loadingCtrl: LoadingController, alertCtrl: AlertController) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
    }

    /** Se muestra un loading */
    public showLoader(msg) {

        /** se crea el componente */
        this.loading = this.loadingCtrl.create({
            content: msg,
            dismissOnPageChange: true
        });

        /** muestra el componente */
        this.loading.present();
    }

    /** muestra un alert */
    public showAlert(title, msg) {

        /** se crea el componente */
        this.alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: ['Aceptar']
        });

        /** muestra el componente */
        this.alert.present();
    }

    /** muestra una alerta de confirmación */
    public showConfirm(title, msg, btnConfirm, fnConfirm){
        
        /** se crea el componente */
        this.confirm = this.alertCtrl.create({
            title: title,
            message: msg,
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                        console.log('click en cancelar.')
                    }
                },
                {
                    text: btnConfirm,
                    handler: fnConfirm
                }
            ]
        });
        /** muestra el componente */
        this.confirm.present();        
    }

    /** muestra una alerta Toast */
    showToast(Msj,time,position) {
        let toast = this.toastCtrl.create({
          message: Msj,
          duration: time,
          position: position,
          cssClass: ""
        });
        toast.present();
    }
}