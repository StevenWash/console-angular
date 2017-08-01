/**
 * Created by StevenWash on 2017/6/14.
 */
import { Injectable } from '@angular/core';
import { Http ,Headers}       from '@angular/http';

import 'rxjs/add/operator/map';
import {HostInfo} from '../entity/constants';

@Injectable()
export class LoginService {

  private loggedIn = false;

  constructor(private http: Http) {
    this.loggedIn=!!localStorage.getItem('tokenId');
  }

  /**
   * 进行登录授权验证
   * @param username
   * @param password
   * @returns {string}
   */
  login(username: string,password:string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("username:"+username+"  password:"+password)
    return this.http
      .post(
        HostInfo.ip+'/api/v1/'+'authentication/user',
        JSON.stringify({ username, password }),
        { headers }
      ) .map(res => res.json()).map((res) => {
        if (res) {
          localStorage.setItem('tokenId', res.tokenId);
          localStorage.setItem('userId',res.userId);
          localStorage.setItem('scopeId',res.scopeId);
          localStorage.setItem('userType',res.userType);
          localStorage.setItem('userType',res.expi);
          this.loggedIn = true;
        }
        return "success";
      });
  }

  /**
   * 进行用户登出操作
   * @returns {Observable<R>}
   */
  logout(){
    localStorage.clear();

    /*let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    console.log(authToken);
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .post('https://dev.izhiju.cn/api/v1/authentication/logout', { headers:headers }).map(res => res.json()).map((res) => {
        if (res) {
          console.log(res);
          localStorage.clear();
        }
        return "success";
      });*/
  }

}
