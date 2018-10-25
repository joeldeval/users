import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LoginRequest, LoginResponse, LoginDataResponse, LoginValidationResponse, AllUserResponse, UserResponse, CreateUserRequest, UpdateUserRequest, UserValidateResponse, NoDataResponse, DataResponse } from './models';
import { environment } from '../../../environments/environment.local';
/**
* Created with angular4-swagger-client-generator.
*/
@Injectable()
export class ApiClientService {

  private domain = environment.BASE_API_ADMIN;

  constructor(private http: HttpClient, @Optional() @Inject('domain') domain: string ) {
    if (domain) {
      this.domain = domain;
    }
  }

  /**
  * Method login
  * @param body The Datos de login
  * @return The full HTTP response as Observable
  */
  public login(body: LoginRequest): Observable<HttpResponse<LoginResponse>> {
    let uri = `/authenticate`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<LoginResponse>('post', uri, headers, params, JSON.stringify(body));
  }

  /**
  * Method user
  * @param Authorization The NODE API USERS
  * @return The full HTTP response as Observable
  */
  public user(Authorization: string): Observable<HttpResponse<AllUserResponse>> {
    let uri = `/user`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    if (Authorization) {
      headers = headers.set('Authorization', Authorization + '');
    }
    return this.sendRequest<AllUserResponse>('get', uri, headers, params, null);
  }

  /**
  * Method createUser
  * @param Authorization The access token.
  * @param body The Datos del usuario a registrar
  * @return The full HTTP response as Observable
  */
  public createUser(Authorization: string, body: CreateUserRequest): Observable<HttpResponse<UserResponse>> {
    let uri = `/user`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    if (Authorization) {
      headers = headers.set('Authorization', Authorization + '');
    }
    return this.sendRequest<UserResponse>('post', uri, headers, params, JSON.stringify(body));
  }

  /**
  * Method updateUser
  * @param Authorization The NODE API USERS
  * @param body The Datos del usuario a modificar
  * @return The full HTTP response as Observable
  */
  public updateUser(Authorization: string, body: UpdateUserRequest): Observable<HttpResponse<UserResponse>> {
    let uri = `/user`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    if (Authorization) {
      headers = headers.set('Authorization', Authorization + '');
    }
    return this.sendRequest<UserResponse>('put', uri, headers, params, JSON.stringify(body));
  }

  /**
  * Method deleteUser
  * @param Authorization The access token.
  * @param id The Id del usuario a eliminar
  * @return The full HTTP response as Observable
  */
  public deleteUser(Authorization: string, id: number): Observable<HttpResponse<DataResponse>> {
    let uri = `/user/${id}`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    if (Authorization) {
      headers = headers.set('Authorization', Authorization + '');
    }
    return this.sendRequest<DataResponse>('delete', uri, headers, params, null);
  }

  private sendRequest<T>(method: string, uri: string, headers: HttpHeaders, params: HttpParams, body: any): Observable<HttpResponse<T>> {
    if (method === 'get') {
      return this.http.get<T>(this.domain + uri, { headers: headers.set('Accept', 'application/json'), params: params, observe: 'response' });
    } else if (method === 'put') {
      return this.http.put<T>(this.domain + uri, body, { headers: headers.set('Content-Type', 'application/json'), params: params, observe: 'response' });
    } else if (method === 'post') {
      return this.http.post<T>(this.domain + uri, body, { headers: headers.set('Content-Type', 'application/json'), params: params, observe: 'response' });
    } else if (method === 'delete') {
      return this.http.delete<T>(this.domain + uri, { headers: headers, params: params, observe: 'response' });
    } else {
      console.error('Unsupported request: ' + method);
      return Observable.throw('Unsupported request: ' + method);
    }
  }
}
