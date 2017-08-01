/**
 * Created by StevenWash on 2017/6/16.
 */
import {Permission} from './permissions';

export class RoleInfo{
   type:string;
   id:string;
   scopeId:string;
   createOn:string;
   createBy:string;
   modifiedOn:string;
   modifiedBy:string;
   optlock:number;
   name:string;
   permissions:Permission=new Permission();
   attributes:string;
   properties:string;
}

export class RolePermissionInfo{
   type:string;
   id:string;
   roleId:string;
   createdOn:string;
   createdBy:string;
   scopeId:string;
   permission:Permission=new Permission();
}
