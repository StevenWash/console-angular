/**
 * Created by StevenWash on 2017/7/14.
 */
import {Injectable} from "@angular/core";
import {Http, URLSearchParams , Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {SSOConfig} from '../entity/constants';
import {UUID} from 'angular2-uuid';

@Injectable()
export class SSOLoginService{
  private OauthLoginEndPointUrl = 'https://dev.izhiju.cn/auth/realms/master/protocol/openid-connect/auth';  // Oauth Login EndPointUrl to web API
  private clientId ='console';
  private clientSecret ='c9f4d3e4-c0b8-4606-826c-1de1debaab25';

  constructor(public http: Http) {
  }

  /**
   * 得到登陆得URL
   * @returns {string}
   */
  getLoginUri():string{
    let state=UUID.UUID();
    let params: URLSearchParams = new URLSearchParams(SSOConfig.sso_auth+"?");
    console.log(params);
    params.set('scope','openid');
    params.set('response_type','code');
    params.set('client_id',SSOConfig.client_id);
    params.set('state',state);
    params.set('redirect_uri',SSOConfig.redirect_uri);

    console.log('params：'+params);
    return params.toString().replace("=&","");
  }

  login(username, password) {

    let params: URLSearchParams = new URLSearchParams();
    params.set('username', username );
    params.set('password', password );
    params.set('client_id', this.clientId );
    params.set('client_secret', this.clientSecret );
    params.set('grant_type', 'password' );

    return this.http.get(this.OauthLoginEndPointUrl,{search: params})
      .map(this.handleData)
      .catch(this.handleError);
  }

  private handleData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  public logout() {
    localStorage.removeItem('token');
  }
}
