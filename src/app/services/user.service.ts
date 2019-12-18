import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { CONST } from '../data/const';
import { AuthInfo } from '../models/authInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL_LIST_USER;
  private URL_LOGIN;
 
  constructor(private http: HttpClient) {
    this.URL_LIST_USER  = CONST.BASE_URL + '/users';
    this.URL_LOGIN      = CONST.BASE_URL + '/login';
  }

  login(authInfo: AuthInfo) : Observable<User> {
    return this.http.post<User>(this.URL_LOGIN, authInfo);
  }
 
  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.URL_LIST_USER);
  }
 
  public save(user: User) {
    return this.http.post<User>(this.URL_LIST_USER, user);
  }
}
