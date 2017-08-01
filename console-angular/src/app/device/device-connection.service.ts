/**
 * Created by StevenWash on 2017/6/16.
 */
import {Http,Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {HostInfo} from '../entity/constants';
import {DeviceInfo} from '../entity/device';

@Injectable()
export class DeviceConnectionService {
  private deviceConnectionUrl:string;
  private deviceUrl:string;
  constructor(private  http:Http){}

  /**
   * 得到设备的所有连接属性
   * @returns {Observable<R>}
   */
  getDeviceConnection(inputDeviceConnClientId:string,inputDeviceConnClientStatus:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    if(inputDeviceConnClientId!=null&&inputDeviceConnClientId.length>0&&inputDeviceConnClientStatus!=null&&inputDeviceConnClientStatus.length>0){
      this.deviceConnectionUrl=HostInfo.ip+'/api/v1/'+scopeId+'/deviceconnections?clientId='+inputDeviceConnClientId+'&status='+inputDeviceConnClientStatus+'&offset=0&limit=50';
    }else if(inputDeviceConnClientId!=null&&inputDeviceConnClientId.length>0&&(inputDeviceConnClientStatus==null||inputDeviceConnClientStatus.length<=0)){
      this.deviceConnectionUrl=HostInfo.ip+'/api/v1/'+scopeId+'/deviceconnections?clientId='+inputDeviceConnClientId+'&offset=0&limit=50';
    }else if((inputDeviceConnClientId==null||inputDeviceConnClientId.length<=0)&&inputDeviceConnClientStatus!=null&&inputDeviceConnClientStatus.length>0){
      this.deviceConnectionUrl=HostInfo.ip+'/api/v1/'+scopeId+'/deviceconnections?status='+inputDeviceConnClientStatus+'&offset=0&limit=50';
    }else
      this.deviceConnectionUrl=HostInfo.ip+'/api/v1/'+scopeId+'/deviceconnections?offset=0&limit=50';

    console.log(this.deviceConnectionUrl);

    return this.http.get(this.deviceConnectionUrl,{ headers: headers }).map(res => res.json());

  }

  /**
   * 得到所有的设备信息
   * @returns {Observable<R>}
   */
  getDeviceList(inputDeviceClientId:string,inputDeviceConStatus:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    if(inputDeviceClientId!=null&&inputDeviceClientId.length>0&&inputDeviceConStatus!=null&&inputDeviceConStatus.length>0){
      this.deviceConnectionUrl=HostInfo.ip+'/api/v1/'+scopeId+'/devices?clientId='+inputDeviceClientId+'&status='+inputDeviceConStatus+'&offset=0&limit=50';
    }else if(inputDeviceClientId!=null&&inputDeviceClientId.length>0&&(inputDeviceConStatus==null||inputDeviceConStatus.length<=0)){
      this.deviceConnectionUrl=HostInfo.ip+'/api/v1/'+scopeId+'/devices?clientId='+inputDeviceClientId+'&offset=0&limit=50';
    }else if((inputDeviceClientId==null||inputDeviceClientId.length<=0)&&inputDeviceConStatus!=null&&inputDeviceConStatus.length>0){
      this.deviceConnectionUrl=HostInfo.ip+'/api/v1/'+scopeId+'/devices?status='+inputDeviceConStatus+'&offset=0&limit=50';
    }else
      this.deviceConnectionUrl=HostInfo.ip+'/api/v1/'+scopeId+'/devices?offset=0&limit=50';

    console.log(this.deviceConnectionUrl);

    return this.http.get(this.deviceConnectionUrl,{ headers: headers }).map(res => res.json());

  }


  /**
   * 添加一个设备信息
   * @param deviceInfo
   * @returns {Observable<R>}
   */
  addDevice(deviceInfo:DeviceInfo){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.deviceUrl=HostInfo.ip+'/api/v1/'+scopeId+'/devices';

    return this.http.post(this.deviceUrl,JSON.stringify(deviceInfo),{ headers: headers }).map(res => res.json());
  }

  /**
   * 通过设备的id来删除该设备
   * @param deviceId
   * @returns {Observable<Response>}
   */
  deleteDeviceByDeviceId(deviceId:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');
    console.log(headers);
    console.log(deviceId);

    this.deviceUrl=HostInfo.ip+'/api/v1/'+scopeId+'/devices/'+deviceId;
    return this.http.delete(this.deviceUrl,{ headers: headers });
  }

  /**
   * 通过==设备的id来更新设备的信息
   * @param deviceId
   * @param device
   * @returns {Observable<R>}
   */
  updateDeviceById(deviceId:string,device:DeviceInfo){
    console.log(device.clientId);
    console.log("deviceId:"+deviceId);
    console.log(device.optlock);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('tokenId');
    headers.append('Authorization', `Bearer ${authToken}`);

    let scopeId = localStorage.getItem('scopeId');

    this.deviceUrl=HostInfo.ip+'/api/v1/'+scopeId+'/devices/'+deviceId;

    return this.http.put(this.deviceUrl,JSON.stringify(device),{ headers: headers }).map(res => res.json());
  }
}
