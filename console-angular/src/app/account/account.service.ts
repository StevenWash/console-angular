import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";
import {HostInfo} from '../entity/constants';
import {AccountInfo} from '../entity/account-info';
import {UserInfo} from '../entity/user-info';
import {Credential} from '../entity/credential';
/**
 * Created by StevenWash on 2017/6/28.
 */

@Injectable()
export class AccountService{
  private accountUrl:string;

  constructor (
    private http:Http
  ){}

  /**
   * 获取当前scopeId下的所有的账号信息
   * @returns {Observable<R>}
   */
  getAccountList(accountName:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    if(accountName!=null){
      this.accountUrl=HostInfo.ip+'/api/v1/'+scopeId+'/accounts?name='+accountName+'&offset=0&limit=50';
    }else
      this.accountUrl=HostInfo.ip+'/api/v1/'+scopeId+"/accounts?offset=0&limit=50";

    return this.http.get(this.accountUrl,{ headers: headers }).map(res => res.json());
  }

  /**
   * 添加一个账号信息
   * @param account
   * @returns {Observable<R>}
   */
  addAccount(account:AccountInfo){
    console.log(account);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.accountUrl=HostInfo.ip+'/api/v1/'+scopeId+'/accounts';

    return this.http.post(this.accountUrl,JSON.stringify(account),{ headers: headers }).map(res => res.json());
  }

  /**
   * 通过accountId更新账号信息
   * @param accountId
   * @param account
   * @returns {Observable<R>}
   */
  updateAccountById(accountId:string,account:AccountInfo){
    console.log(account.name);
    console.log("accountId:"+accountId);
    console.log(account.optlock);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.accountUrl=HostInfo.ip+'/api/v1/'+scopeId+'/accounts/'+accountId;

    return this.http.put(this.accountUrl,JSON.stringify(account),{ headers: headers }).map(res => res.json());
  }

  /**
   * 根据accountId来删除账号信息
   * @param accountId
   * @returns {Observable<Response>}
   */
  deleteAccountByAccountId(accountId:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.accountUrl=HostInfo.ip+'/api/v1/'+scopeId+'/accounts/'+accountId;
    return this.http.delete(this.accountUrl,{ headers: headers });
  }

  /**
   * 获得在某个accounId下的所有的用户信息
   * @param accountId
   * @returns {Observable<R>}
   */
  getAccountUsers(accountId:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = accountId;

    this.accountUrl=HostInfo.ip+'/api/v1/'+scopeId+'/users';

    return this.http.get(this.accountUrl,{ headers: headers }).map(res => res.json());
  }

  /**
   * 在accountId账号下添加用户信息
   * @param accountId
   * @param accUser
   * @returns {Observable<R>}
   */
  addAccountUser(accountId:string,accUser:UserInfo){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = accountId;
    accUser.scopeId=scopeId;
    console.log(accUser);

    this.accountUrl=HostInfo.ip+'/api/v1/'+scopeId+'/users';

    return this.http.post(this.accountUrl,JSON.stringify(accUser),{ headers: headers }).map(res => res.json());
  }

  /**
   * 在accountId账号添加密码信息
   * @param accountId
   * @param accCredential
   * @returns {Observable<R>}
   */
  addAccountCredential(accountId:string,accCredential:Credential){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId =accountId;
    accCredential.scopeId=scopeId;

    this.accountUrl=HostInfo.ip+'/api/v1/'+scopeId+'/credentials';
    return this.http.post(this.accountUrl,JSON.stringify(accCredential),{ headers: headers }).map(res => res.json());
  }

  /**
   * 删除用户信息
   * @param userId
   * @returns {Observable<R>}
   */
  deleteAccountUser(accountId:string,userId:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId =accountId;

    this.accountUrl=HostInfo.ip+'/api/v1/'+scopeId+'/users/'+userId;
    return this.http.delete(this.accountUrl,{ headers: headers });
  }
}
