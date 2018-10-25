import { Alert } from 'ionic-angular/components/alert/alert';
import { Loading } from 'ionic-angular/components/loading/loading';
import { LoadingController, AlertController } from 'ionic-angular';

export interface IBasePage {

    loadingCtrl: LoadingController;
    alertCtrl: AlertController;
    loading: Loading;
    alert: Alert;

    showLoader(msg: string);
    showAlert(title: string, msg: string);

}