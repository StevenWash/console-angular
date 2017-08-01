/**
 * Created by StevenWash on 2017/6/27.
 */

export class Permission{
  domain:string;
  action:Actions;
  targetScopeId:string;
  groupId:string;
  forwaradable:boolean;
}

export enum Actions{
  read,write,delete,connect,execute
}
