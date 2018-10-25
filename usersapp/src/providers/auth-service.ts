

import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

// Models Swagger
import { LoginRequest } from "../business/_services/swagger/models/loginrequest.model";

// Swagger Client API
import { ApiClientService } from '../business/_services/swagger/index';
import { LoginResponse } from '../business/_services/swagger/models';


@Injectable()
export class AuthService {

    token: string;
    public error: string;

    constructor(private storage: Storage, private _apiClient: ApiClientService) 
    {

    }

    // Realiza la peticion al servidor y guarda los datos del usuario 
    login(credentials: LoginRequest) {

        return this._apiClient.login(credentials)
        .toPromise()
        .then( data => this.saveData(data.body) );
    }
    
    // guarda los datos del usuario
    saveData(data: LoginResponse) {
        console.log('se guarda')
       let key = "currentUser";
        this.storage.set(key, data.user);
        this.storage.set("token", data.token);

    }
    
    // elimina el token y el usuario
    logout() {
        this.storage.clear();
    }

    // Verifica si existe token 
    async isLogged()
    {
        let isLogged = true;

         await this.storage.get('token').then(token => {            
            if(token == null || token == '')
                isLogged = false;
        });
        return isLogged;
    }
}