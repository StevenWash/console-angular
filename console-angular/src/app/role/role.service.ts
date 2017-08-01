/**
 * Created by StevenWash on 2017/6/16.
 */
import {Http,Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';
import {HostInfo} from '../entity/constants';
import {RoleInfo, RolePermissionInfo} from '../entity/role-info';
import {AccessInfo, AccessRole} from '../entity/access-role';

@Injectable()
export class RoleService{
  private roleUrl:string;

  private roles:RoleInfo[];
  private role:RoleInfo;

  constructor(
    private http:Http
  ){}

  /**
   * 获取当前scopeId下的所有的角色信息
   * @returns {Observable<R>}
   */
  getRoles(inputRoleName:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    if(inputRoleName!=null){
      this.roleUrl=HostInfo.ip+'/api/v1/'+scopeId+'/roles?name='+inputRoleName+'&offset=0&limit=50';
    }else
      this.roleUrl=HostInfo.ip+'/api/v1/'+scopeId+'/roles?offset=0&limit=50';

    return this.http.get(this.roleUrl,{ headers: headers }).map(res => res.json());

  }

  /**
   * 根据roleId来更新role的信息
   * @param roleId
   * @param role
   * @returns {Observable<R>}
   */
  updateROleById(roleId:string,role:RoleInfo){
    console.log(role.name);
    console.log("roleId:"+roleId);
    console.log(role.optlock);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.roleUrl=HostInfo.ip+'/api/v1/'+scopeId+'/roles/'+roleId;

    return this.http.put(this.roleUrl,JSON.stringify(role),{ headers: headers }).map(res => res.json());
  }


  /**
   * 添加角色信息
   * @param role
   * @returns {Observable<R>}
   */
  addRole(role:RoleInfo){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');
    role.scopeId=scopeId;

    this.roleUrl=HostInfo.ip+'/api/v1/'+scopeId+'/roles';

    return this.http.post(this.roleUrl,JSON.stringify(role),{ headers: headers }).map(res => res.json());

  }

  /**
   * 通过roleId删除当前角色信息
   * @param roleId
   * @returns {Observable<Response>}
   */
  deleteRoleByRoleId(roleId:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.roleUrl=HostInfo.ip+'/api/v1/'+scopeId+'/roles/'+roleId;

    return this.http.delete(this.roleUrl,{ headers: headers });
  }

  /**
   * 通过roleId来获取当前角色下的所有权限信息
   * @param roleId
   * @returns {Observable<R>}
   */
  getRolePermissionByRole(roleId:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.roleUrl=HostInfo.ip+'/api/v1/'+scopeId+"/roles/"+roleId+"/permissions?offset=0&limit=50";

    return this.http.get(this.roleUrl,{ headers: headers }).map(res => res.json());
  }

  /**
   * 通过userId查询AccessInfo的信息
   * @param userId
   * @returns
   */
  getAccessInfosByUserId(userId:string):Promise<AccessInfo[]>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.roleUrl=HostInfo.ip+'/api/v1/'+scopeId+'/accessinfos?userId='+userId+'&offset=0&limit=50';
    //return this.http.get(this.roleUrl,{ headers: headers }).map(res => res.json());

    return this.http.get(this.roleUrl,{ headers: headers }).toPromise()
      .then(response => response.json().items.item as AccessInfo[])
      .catch(this.handleError);
  }

  /**
   * 通过accessInfoId查询出accessRole的信息
   * @param accessInfoId
   * @returns {Observable<R>}
   */
  getAccessRolesByAccessInfoId(accessInfoId:string):Promise<AccessRole[]>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.roleUrl=HostInfo.ip+'/api/v1/'+scopeId+'/accessinfos/'+accessInfoId+'/roles?offset=0&limit=50';
    return this.http.get(this.roleUrl,{ headers: headers }).toPromise()
      .then(response => response.json().items.item as AccessRole[])
      .catch(this.handleError);
  }

  /**
   * 通过roleId获取role相关的信息
   * @param roleId
   * @returns {Observable<R>}
   */
  getRoleByRoleId(roleId:string):Promise<RoleInfo>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.roleUrl=HostInfo.ip+'/api/v1/'+scopeId+'/roles/'+roleId;
    return this.http.get(this.roleUrl,{ headers: headers }).toPromise()
      .then(response => response.json()as RoleInfo)
      .catch(this.handleError);
  }

  /**
   * 通过roleId来获取该角色对应的权限信息
   * @param roleId
   * @returns {Observable<R>}
   */
  getPermissionByRoleId(roleId:string):Promise<RolePermissionInfo[]>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.roleUrl=HostInfo.ip+'/api/v1/'+scopeId+'/roles/'+roleId+'/permissions?offset=0&limit=50';
    return this.http.get(this.roleUrl,{ headers: headers }).toPromise()
      .then(response => response.json().items.item as RolePermissionInfo[])
      .catch(this.handleError);
  }

  /**
   * 添加accessRole
   * @param accessRole
   * @returns {Observable<R>}
   */
  addAccessRole(accessRole:AccessRole){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');
    accessRole.scopeId=scopeId;

    this.roleUrl=HostInfo.ip+'/api/v1/'+scopeId+'/accessinfos/'+accessRole.accessInfoId+'/roles';

    return this.http.post(this.roleUrl,JSON.stringify(accessRole),{ headers: headers }).map(res => res.json());
  }


  /**
   * 异常处理函数
   * @param error
   * @returns {Promise<never>}
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }



}
