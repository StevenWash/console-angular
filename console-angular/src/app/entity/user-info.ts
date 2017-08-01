/**
 * Created by StevenWash on 2017/6/15.
 */

export class UserInfo{
   type:string;
   id:string;
   scopeId:string;
   createdOn:string;
   createdBy:string;
   modifiedOn:string;
   modifiedBy:string;
   optlock:number;
   name:string;
   status:string;
   displayName:string;
   email:string;
   phoneNumber:string;
   userType:string;
}


export class UserResponse{
   type: string;
   limitExceeded: boolean;
   size: number;
   items: {
    item: UserInfo[];
  };
}
