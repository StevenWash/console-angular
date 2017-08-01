/**
 * Created by StevenWash on 2017/6/15.
 */
import {Http,Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {UserInfo} from '../entity/user-info';
import {HostInfo} from '../entity/constants';
import {Credential} from '../entity/credential';
import {AccessInfo} from '../entity/access-role';

@Injectable()
export class UserService {

  private userListUrl:string;

  constructor(
    private http: Http
  ){ }

  /**
   * 得到当前所有的用户信息
   * @returns {Observable<R>}
   */
  getUserList(selectUsername:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    console.log(selectUsername);

    if(selectUsername!=null){
      this.userListUrl=HostInfo.ip+'/api/v1/'+scopeId+'/users?name='+selectUsername+'&offset=0&limit=50';
    }else
      this.userListUrl=HostInfo.ip+'/api/v1/'+scopeId+'/users';

    console.log(this.userListUrl);

    return this.http.get(this.userListUrl,{ headers: headers }).map(res => res.json());
  }

  /**
   * 通过userId得到用户信息
   * @param userId
   * @returns {Observable<R>}
   */
  getLoginUser() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let userId = localStorage.getItem('userId');
    let scopeId = localStorage.getItem('scopeId');

    this.userListUrl=HostInfo.ip+'/api/v1/'+scopeId+'/users/'+userId;

    return this.http.get(this.userListUrl,{ headers: headers }).map(res => res.json());
  }


  /**
   * 更具用户的userId来更新用户数据
   * @param userId
   * @param user
   * @returns {Observable<R>}
   */
  updateUserById(userId:string,user:UserInfo){
    console.log(user.name);
    console.log("userId:"+userId);
    console.log(user.optlock);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId =user.scopeId;

    this.userListUrl=HostInfo.ip+'/api/v1/'+scopeId+'/users/'+userId;

    return this.http.put(this.userListUrl,JSON.stringify(user),{ headers: headers }).map(res => res.json());
  }

  /**
   * 添加用户信息：更新User信息，同时还要更新密码信息
   * @param user
   * @returns {Observable<R>}
   */
  addUser(user:UserInfo){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');
    let userType = localStorage.getItem('userType');
    user.scopeId=scopeId;
    user.userType=userType;
    this.userListUrl=HostInfo.ip+'/api/v1/'+scopeId+'/users';

    return this.http.post(this.userListUrl,JSON.stringify(user),{ headers: headers }).map(res => res.json());

  }

  /**
   * 添加密码信息
   * @param credential
   */
  addCredential(credential:Credential){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');
    credential.scopeId=scopeId;

    console.log(credential.scopeId);

    this.userListUrl=HostInfo.ip+'/api/v1/'+scopeId+'/credentials';
    return this.http.post(this.userListUrl,JSON.stringify(credential),{ headers: headers }).map(res => res.json());

  }

  /**
   * 删除用户信息
   * @param userId
   * @returns {Observable<R>}
   */
  deleteUser(userId:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');
    console.log(headers);
    console.log(userId);

    this.userListUrl=HostInfo.ip+'/api/v1/'+scopeId+'/users/'+userId;
    return this.http.delete(this.userListUrl,{ headers: headers });
  }

  /**
   * 通过用户的id获取当前用户的所有的角色信息
   * @param userId
   * @returns {Observable<Response>}
   */
  getRolesByUserId(userId:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.userListUrl=HostInfo.ip+'/api/v1/'+scopeId+'/roles/query/'+scopeId+'/'+userId;
    return this.http.get(this.userListUrl,{ headers: headers }).map(res => res.json());

  }

  /**
   * 通过userId获取该userId下的所有的密码信息
   * @param userId
   * @returns {Observable<Response>}
   */
  getCredentialsByUserId(userId:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.userListUrl=HostInfo.ip+'/api/v1/'+scopeId+'/credentials?userId='+userId+'&offset=0&limit=50';
    return this.http.get(this.userListUrl,{ headers: headers }).map(res => res.json());

  }

  /**
   * 更新用户的密码信息
   * @param userCredential
   * @returns {Observable<R>}
   */
  updateCredential(userCredential:Credential){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.userListUrl=HostInfo.ip+'/api/v1/'+scopeId+'/credentials/'+userCredential.id;
    return this.http.put(this.userListUrl,JSON.stringify(userCredential),{ headers: headers }).map(res => res.json());

  }

  /**
   * 根据用户的密码的id来删除该条密码信息
   * @param userCredentialId
   * @returns {Observable<Response>}
   */
  deleteUserCredential(userCredentialId:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');
    console.log(headers);
    console.log(userCredentialId);

    this.userListUrl=HostInfo.ip+'/api/v1/'+scopeId+'/credentials/'+userCredentialId;
    return this.http.delete(this.userListUrl,{ headers: headers });
  }

  /**
   * 根据userId添加一条accessInfo信息
   * @returns {Observable<R>}
   */
  addAccessInfo(accessInfo:AccessInfo){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');
    let userId = localStorage.getItem('userId');

    accessInfo.scopeId=scopeId;

    this.userListUrl=HostInfo.ip+'/api/v1/'+scopeId+'/accessinfos';

    return this.http.post(this.userListUrl,JSON.stringify(accessInfo),{ headers: headers }).map(res => res.json());
  }
}
