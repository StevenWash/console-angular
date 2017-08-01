/**
 * Created by StevenWash on 2017/6/16.
 */

export class DeviceInfo{
   type:string;
   id:string;
   scopeId:string;
   createdOn:string;
   createdBy:string;
   modifiedOn:string;
   modifiedBy:string;
   optlock:number;
   groupId:string;
   clientId:string;
   status:string;
   displayName:string;
   deviceCredentialsMode:string;
   acceptEncoding: string;
   applicationIdentifiers: string;
   biosVersion: string;
   connection: ConnectionModel=new ConnectionModel();
   connectionId: string;
   firmwareVersion: string;
   jvmVersion: string;
   lastEvent: LastEventModel=new LastEventModel();
   lastEventId: string;
   modelId: string;
   osVersion: string;
   osgiFrameworkVersion: string;
   serialNumber: string;
   imei:string;
   imsi:string;
   iccid:string;
}

export class LastEventModel {
  private action: string;
  private createdBy: string;
  private deviceId: any;
  private eventMessage: string;
  private id: string;
  private position: PositionModel=new PositionModel();
  private receivedOn: string;
  private resource: string;
  private responseCode: string;
  private scopeId: string;
}

export class PositionModel {
  private altitude: number;
  private latitude: number;
  private longitude: number;
}

export class ConnectionModel {
  private clientId: string;
  private clientIp: string;
  private createdBy: string;
  private createdOn: string;
  private id: string;
  private modifiedBy: string;
  private modifiedOn: string;
  private optlock: number;
  private protocol: string;
  private scopeId: string;
  private status: string;
  private userId: any;
}
