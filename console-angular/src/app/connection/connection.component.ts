import { Component, OnInit } from '@angular/core';
import {DeviceConnection} from '../entity/device-connect';
import {Router} from '@angular/router';
import {DeviceConnectionService} from '../device/device-connection.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  //--------device connection相关的变量信息--------//
  private cliConnection:DeviceConnection;
  private deviceConnections:DeviceConnection[];
  private inputDeviceConnClientId:string;
  private inputDeviceConnClientStatus:string;

  constructor(
    private deviceConnectionService:DeviceConnectionService,
    private router : Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userId')==null||localStorage.getItem('userId').length==0){
      console.log("home2..");
      this.router.navigate(['/login']);
    }else {
      this.getDeviceConnection();
    }
  }


  //--------------------DeviceConnection Action---------------------------//
  /**
   * 得到所有的设备连接信息
   */
  getDeviceConnection(){
    console.log(this.inputDeviceConnClientId+"  "+this.inputDeviceConnClientStatus);

    this.deviceConnectionService.getDeviceConnection(this.inputDeviceConnClientId,this.inputDeviceConnClientStatus).subscribe((result) => {
      console.log(result);
      this.deviceConnections=result.items.item;
    });
  }

  /**
   * 获取用户点击的设备连接信息
   * @param deviceConnection
   */
  clickConnection(deviceConnection:DeviceConnection){
    this.cliConnection=deviceConnection;
    console.log(this.cliConnection);

  }

  /**
   * 点击重置按钮之后的操作事件
   */
  resetInputDeviceConn(){
    this.inputDeviceConnClientId=null;
    this.inputDeviceConnClientStatus=null;
    this.getDeviceConnection();
  }

}
