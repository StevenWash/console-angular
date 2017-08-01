/**
 * Created by StevenWash on 2017/7/4.
 */

export class HostInfo {
  static ip:string="https://dev.izhiju.cn";
  // static ip:string="http://localhost:8080";
  //static ip:string="http://119.29.194.39:8080";
}

export class SSOConfig{
  static sso_auth:string='https://dev.izhiju.cn/auth/realms/master/protocol/openid-connect/auth';
  static client_id:string='console';
  static redirect_uri:string='http://174y68p835.51mypc.cn/console/sso/callback';
  static client_secret:string='4aa2643b-0973-415c-809e-73a52b5da5b5';
}

export class DefaultMqttInfo {
  public static ipAddress : string ='127.0.0.1';
  static port : string ='1883';
  static tracestart :string ='1';
  static clientId : string ='Mqtt-Web-Client';
  static cleanSession : boolean = true;
  static keepAlive : string ='30';
  static retryInterval :string ='10';
  static usePersistence :string ='0';
  static directory :string ='';
  static topic : string ='topic';
  static qos : string ='1';
  static retained :string ='1';
  static data :string ='';
}

