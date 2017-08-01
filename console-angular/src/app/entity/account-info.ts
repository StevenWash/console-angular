/**
 * Created by StevenWash on 2017/6/28.
 */

export class AccountInfo{
  type:string;
  id:string;
  name:string;
  scopeId:string;
  createdOn:string;
  createdBy:string;
  modifiedOn:string;
  modifiedBy:string;
  optlock:number;
  organization:Organization=new Organization();
  parentAccountPath:string;

  organizationName: string;
  organizationPersonName: string;
  organizationEmail: string;
  organizationPhoneNumber: string;
  organizationAddressLine1: string;
  organizationAddressLine2: string;
  organizationCity: string;
  organizationZipPostCode: string;
  organizationStateProvinceCounty: string;
  organizationCountry:string;
}

export class Organization{
  addressLine1:string;
  addressLine2:string;
  city:string;
  country:string;
  email:string;
  name:string;
  personName:string;
  phoneNumber:string;
  stateProvinceCountry:string;
  zipPostCode:string;
}
