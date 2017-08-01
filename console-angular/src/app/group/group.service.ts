import {Http,Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {HostInfo} from '../entity/constants';
import {GroupInfo} from '../entity/group-info';
/**
 * Created by StevenWash on 2017/6/16.
 */

@Injectable()
export class GroupService {
  private groupUrl:string;

  constructor(
    private http: Http
  ){}

  /**
   * 获取当前所有的组别信息
   * @returns {Observable<R>}
   */
  getGroupList(inputGroupname:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    if(inputGroupname!=null){
      this.groupUrl=HostInfo.ip+'/api/v1/'+scopeId+'/groups?name='+inputGroupname+'&offset=0&limit=50';
    }else
      this.groupUrl=HostInfo.ip+'/api/v1/'+scopeId+'/groups?offset=0&limit=50';



    return this.http.get(this.groupUrl,{ headers: headers }).map(res => res.json());
  }

  /**
   * 添加一个分组信息
   * @param group
   * @returns {Observable<R>}
   */
  addGroup(group:GroupInfo){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.groupUrl=HostInfo.ip+'/api/v1/'+scopeId+"/groups";

    return this.http.post(this.groupUrl,JSON.stringify(group),{ headers: headers }).map(res => res.json());
  }

  /**
   * 更新用户组通过小组id
   * @param groupId
   * @param group
   * @returns {Observable<R>}
   */
  updateGroupById(groupId:string,group:GroupInfo){
    console.log(group.name);
    console.log("groupId:"+groupId);
    console.log(group.optlock);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.groupUrl=HostInfo.ip+'/api/v1/'+scopeId+'/groups/'+groupId;

    return this.http.put(this.groupUrl,JSON.stringify(group),{ headers: headers }).map(res => res.json());
  }

  /**
   * 通过groupId来删除小组的信息
   * @param groupId
   * @returns {Observable<Response>}
   */
  deleteGroupByGroupId(groupId:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.groupUrl=HostInfo.ip+'/api/v1/'+scopeId+'/groups/'+groupId;

    return this.http.delete(this.groupUrl,{ headers: headers });
  }
}
