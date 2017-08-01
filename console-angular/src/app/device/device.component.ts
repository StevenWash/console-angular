import { Component, OnInit } from '@angular/core';
import {DeviceInfo} from '../entity/device';
import {GroupInfo} from '../entity/group-info';
import {DeviceConnectionService} from './device-connection.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  //--------device相关的变量信息--------//
  private deviceInfos:DeviceInfo[];
  private aDevice:DeviceInfo=new DeviceInfo();
  private delDeviceId:string;
  private device:DeviceInfo;
  private cliDevice:DeviceInfo=new DeviceInfo();
  private inputDeviceClientId:string;
  private inputDeviceConStatus:string;
  private deviceOptlock:number;

  constructor(
    private deviceConnectionService:DeviceConnectionService,
    private router: Router
    ) { }

  ngOnInit() {
    if(localStorage.getItem('userId')==null||localStorage.getItem('userId').length==0){
      console.log("home2..");
      this.router.navigate(['/login']);
    }else {
      this.getDevices();
    }
  }

  //--------------------Device Action---------------------------//
  /**
   * 得到所有的设备信息
   */
  getDevices(){
    console.log(this.inputDeviceClientId+"  "+this.inputDeviceConStatus)
    this.deviceConnectionService.getDeviceList(this.inputDeviceClientId,this.inputDeviceConStatus).subscribe((result) => {
      this.deviceInfos=result.items.item;
    });
  }

  /**
   * 添加设备信息
   */
  addDevice(){
    this.aDevice.deviceCredentialsMode="LOOSE";//设置默认值
    console.log(this.aDevice);
    this.deviceConnectionService.addDevice(this.aDevice).subscribe((result) => {
      console.log(result);
      this.deviceInfos=null;
      this.getDevices();
      this.router.navigate(['/home/device']);
    });
  }

  /**
   * 得到当前用户点击的设备信息的id
   * @param deviceInfo
   */
  getDeviceId(deviceInfo:DeviceInfo){
    console.log(deviceInfo);
    this.delDeviceId=deviceInfo.id;
    console.log(this.delDeviceId);
  }

  /**
   * 通过用户选择的设备的id删除该设备信息
   */
  deleteDevice(){
    console.log(this.delDeviceId);
    this.deviceConnectionService.deleteDeviceByDeviceId(this.delDeviceId).subscribe((result) => {
      console.log(result);
      this.getDevices();
      this.router.navigate(['/home/device']);
    });
  }

  /**
   * 得到当前用户点击的设备信息
   * @param deviceInfo
   */
  getDeviceInfo(deviceInfo:DeviceInfo){
    console.log(deviceInfo);
    this.device=deviceInfo;
  }


  /**
   * 根据的设备的id来更新设备的相关信息
   */
  updateDevice(){
    console.log("optlock1:"+this.device.optlock);
    if(this.deviceOptlock==this.device.optlock+1){
      this.device.optlock+=1;
    }
    console.log(this.device);
    this.deviceConnectionService.updateDeviceById(this.device.id,this.device).subscribe((result) => {
      this.device=result;
      this.deviceOptlock=this.device.optlock;
      console.log("optlock2:"+this.device.optlock);
      console.log(result);
      this.getDevices();
      this.router.navigate(['/home/device']);
    });
  }

  /**
   * 获得点击的设备信息
   * @param deviceInfo
   */
  clickDevice(deviceInfo:DeviceInfo){
    this.cliDevice=deviceInfo;
    console.log(this.cliDevice);
  }

  /**
   * 点击充值按钮之后的处理过程
   */
  resetInputDevice(){
    this.inputDeviceConStatus=null;
    this.inputDeviceClientId=null;
    this.getDevices();
  }
}
