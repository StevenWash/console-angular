/**
 * Created by StevenWash on 2017/7/7.
 */

export class AccessRole{
  id:string;
  scopeId:string;
  createdOn:string;
  createdBy:string;
  accessInfoId:string;
  roleId:string;

}

export class AccessInfo{
  id:string;
  scopeId:string;
  createdOn:string;
  createdBy:string;
  modifiedOn:string;
  modifiedBy:string;
  optlock:number;
  userId:string;
}
