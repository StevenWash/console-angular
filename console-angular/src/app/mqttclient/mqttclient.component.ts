import { Component, OnInit } from '@angular/core';
import {MqttConnectInfo} from '../entity/mqtt-connect-info';
import {DefaultMqttInfo} from '../entity/constants';
import 'paho-mqtt'
import Message = Paho.MQTT.Message;
import OnSuccessCallback = Paho.MQTT.OnSuccessCallback;
import OnFailureCallback = Paho.MQTT.OnFailureCallback;

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
  public messageArrived:string;

  public client:Paho.MQTT.Client =new Paho.MQTT.Client('127.0.0.1',61614,'','client');//61614
  public connectOptions:ConnectionOptions=new ConnectionOptions(60,'kapua-broker','kapua-password',null,30,true,false,this,this.onConnect,4,this.disconnect,null,null);

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
    // set callback handlers
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;

    console.log(this.client);
  }

  connect(){
    console.log(this.client);
    // connect the client
    this.client.connect(this.connectOptions);
  }

  disconnect(){
    console.log(this.client);
    console.log("disconnect...");
  }

  onConnect(invocationContext) {
    console.log(invocationContext);
    let client:Paho.MQTT.Client;
    client=invocationContext.invocationContext.client;

    // Once a connection has been made, make a subscription and send a message.
    client.subscribe('kapua-sys/client/World');

    let message = new Paho.MQTT.Message("Hello");
    message.destinationName = "kapua-sys/client/World";
    client.send(message);

  }

  onConnectionLost(responseObject){
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  onMessageArrived(message){
    console.log("onMessageArrived:"+message.payloadString);
    this.messageArrived=message.payloadString;
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
export class ConnectionOptions {
  /**
   * If the connect has not succeeded within this number of seconds, it is deemed to have failed.
   * @default The default is 30 seconds.
   */
  timeout: number;
  /** Authentication username for this connection. */
  userName: string;
  /** Authentication password for this connection. */
  password: string;
  /** Sent by the server when the client disconnects abnormally. */
  willMessage: Message;
  /**
   * The server disconnects this client if there is no activity for this number of seconds.
   * @default The default value of 60 seconds is assumed if not set.
   */
  keepAliveInterval: number;
  /**
   * If true(default) the client and server persistent state is deleted on successful connect.
   * @default true
   */
  cleanSession: boolean;
  /** If present and true, use an SSL Websocket connection. */
  useSSL: boolean;
  /** Passed to the onSuccess callback or onFailure callback. */
  invocationContext: any;
  /**
   * Called when the connect acknowledgement has been received from the server.
   */
  onSuccess: OnSuccessCallback;
  /**
   * Specifies the mqtt version to use when connecting
   * <dl>
   *     <dt>3 - MQTT 3.1</dt>
   *     <dt>4 - MQTT 3.1.1 (default)</dt>
   * </dl>
   * @default 4
   */
  mqttVersion: 3 | 4;
  /**
   * Called when the connect request has failed or timed out.
   */
  onFailure: OnFailureCallback;
  /**
   * If present this contains either a set of hostnames or fully qualified
   * WebSocket URIs (ws://example.com:1883/mqtt), that are tried in order in place of the host and port
   * paramater on the construtor. The hosts are tried one at at time in order until one of then succeeds.
   */
  hosts: string[];
  /**
   * If present the set of ports matching the hosts. If hosts contains URIs, this property is not used.
   */
  ports: number[];

  constructor(timeout:number,username:string,password:string,
              willMessage:Message,keepAliveInterval:number,cleanSession:boolean,
              useSSL:boolean,invocationContext:object,onSuccess:OnSuccessCallback,mqttVersion:number,
              onFailure:OnFailureCallback,hosts:string[],ports:number[]){
    this.timeout=timeout;
    this.userName=username;
    this.password=password;
    this.willMessage=willMessage;
    this.keepAliveInterval=keepAliveInterval;
    this.useSSL=useSSL;
    this.invocationContext=invocationContext;
    this.onSuccess=onSuccess;
    this.onFailure=onFailure;
    this.hosts=hosts;
    this.ports=ports;
  }
}

