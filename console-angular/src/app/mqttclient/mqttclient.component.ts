import { Component, OnInit } from '@angular/core';
import {MqttConnectInfo} from '../entity/mqtt-connect-info';
import {DefaultMqttInfo} from '../entity/constants';

@Component({
  selector: 'app-mqttclient',
  templateUrl: './mqttclient.component.html',
  styleUrls: ['./mqttclient.component.css']
})
export class MqttclientComponent implements OnInit {
  public mqttInfo : MqttConnectInfo ;
  public mqttInfo_ :MqttConnectInfo;
  public tracestart :string ;
  public info:string;

  constructor() {
    this.mqttInfo = new MqttConnectInfo();
    this.mqttInfo_ = new MqttConnectInfo();
    this.mqttInfo.ipAddress = DefaultMqttInfo.ipAddress;
    this.mqttInfo.port = DefaultMqttInfo.port;
    this.mqttInfo.tracestart = DefaultMqttInfo.tracestart;
    this.mqttInfo.clientId = DefaultMqttInfo.clientId;
    this.mqttInfo.cleanSession = DefaultMqttInfo.cleanSession;
    this.mqttInfo.keepAlive = DefaultMqttInfo.keepAlive;
    this.mqttInfo.retryInterval = DefaultMqttInfo.retryInterval;
    this.mqttInfo.usePersistence = DefaultMqttInfo.usePersistence;
    this.mqttInfo.directory = DefaultMqttInfo.directory;
    this.mqttInfo.topic = DefaultMqttInfo.topic;
    this.mqttInfo.qos = DefaultMqttInfo.qos;
    this.mqttInfo.retained = DefaultMqttInfo.retained;
    this.mqttInfo.data = DefaultMqttInfo.data;

    this.mqttInfo_=this.mqttInfo;

    if(this.mqttInfo.tracestart=='1') {
      this.tracestart = 'trace(start)';
    }else{
      this.tracestart = 'trace(stop)';
    }
  }

  ngOnInit() {
    this.mqttInfo_=this.mqttInfo;
  }

  connect(){
    console.log(this.mqttInfo_);
  }

  disconnect(){

  }

  cancel(){
    this.mqttInfo=this.mqttInfo_;
    if(this.mqttInfo.tracestart=='1') {
      this.tracestart = 'trace(start)';
    }else{
      this.tracestart = 'trace(stop)';
    }
  }

  apply(){
    this.mqttInfo_=this.mqttInfo;
  }

  changeTrace(){
    if(this.tracestart=='trace(start)'){
      this.tracestart = 'trace(stop)';
      this.mqttInfo.tracestart='0';
    }else{
      this.tracestart = 'trace(start)';
      this.mqttInfo.tracestart='1';
    }
  }

}
