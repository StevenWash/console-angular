import { Component, OnInit } from '@angular/core';
import {UserInfo} from '../entity/user-info';
import {Credential} from '../entity/credential';
import {RoleInfo, RolePermissionInfo} from '../entity/role-info';
import {LoginService} from '../login/login.service';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {AccessInfo, AccessRole} from '../entity/access-role';
import {RoleService} from '../role/role.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // --------user相关的变量信息--------//
  public userInfos: UserInfo [];
  public user: UserInfo;
  public aUser:UserInfo=new UserInfo();
  public aCredential=new Credential();
  public optlock:number;
  public delUserId:string;
  public cliUser:UserInfo;//点击的用户信息
  public inputUsername:string;
  public cliUserCredentials:Credential[];
  public userCredential=new Credential();
  public showPassInput:boolean=false;//再添加用户密码的时候判断是否显示密码输入框
  public cliUserCredential:Credential;
  public delUserCredentialId:string;
  public userRoles:RoleInfo[];
  public userPermissions:RolePermissionInfo[];

  public userRoleId:string;//用户进行为当前用户添加角色时选择的角色

  public accessInfos:AccessInfo[];
  public accessRoles:AccessRole[];

  constructor(
    private userService : UserService,
    private router : Router,
    private roleService : RoleService
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userId')==null||localStorage.getItem('userId').length==0){
      console.log("home2..");
      this.router.navigate(['/login']);
    }
    this.getUserList();
  }

  //-------------------User Action ------------------//
  /**
   * 得到所有用户的所有信息
   */
  getUserList(){
    this.userService.getUserList(this.inputUsername).subscribe((result) => {
      console.log(result);
      this.userInfos=result.items.item;
    });
  }

  /**
   * 在用户管理界面点击update之后将当前用户的信息显示在update的提示框中
   * @param userInfo
   */
  getUserInfo(userInfo:UserInfo){
    console.log(userInfo);
    this.user=userInfo;
  }

  /**
   * 更新用户的信息
   */
  updateUser(){
    console.log("optlock1:"+this.user.optlock);
    if(this.optlock==this.user.optlock+1){
      this.user.optlock+=1;
    }
    this.userService.updateUserById(this.user.id,this.user).subscribe((result) => {
      this.user=result;
      this.optlock=this.user.optlock;
      console.log("optlock2:"+this.user.optlock)
      console.log(result);
      this.getUserList();
      this.router.navigate(['/home/user']);
    });
  }

  /**
   * 添加用户信息
   */
  addUser(){
    console.log(this.aUser);

    this.userService.addUser(this.aUser).subscribe((result) => {
      console.log(result);

      this.aCredential.userId=result.id;
      this.aCredential.credentialType="PASSWORD";
      this.aCredential.credentialKey=this.aCredential.password;

      console.log(this.aCredential);
      this.userService.addCredential(this.aCredential).subscribe((result) => {
        console.log(result);
      });

      this.getUserList();
      this.router.navigate(['/home/user']);
    });
  }

  /**
   * 点击删除之后将当前点击的用户的id传入
   * @param userInfo
   */
  getUserId(userInfo:UserInfo){
    console.log(userInfo);
    this.delUserId=userInfo.id;
    console.log(this.delUserId);
  }

  /**
   * 删除用户信息
   */
  deleteUser(){
    console.log(this.delUserId);
    this.userService.deleteUser(this.delUserId).subscribe((result) => {
      console.log(result);
      this.getUserList();
      this.router.navigate(['/home/user']);
    });
  }

  /**
   * 根据用户id获取该用户的所有的密码信息
   * @param userInfo
   */
  getUserCredentials(userId:string){
    this.userService.getCredentialsByUserId(userId).subscribe((result) => {
      console.log(result);
      this.cliUserCredentials=result.items.item;
    });
  }

  /**
   * 通过userId获取所有的角色信息
   * @param userId
   */
  getUserRolesAndPermissionByUserId(userId:string){
    var roleList: Array<RoleInfo> = [];
    var permissionList: Array<RolePermissionInfo> = [];

    this.roleService.getAccessInfosByUserId(userId).then(accessInfos=> {
      this.accessInfos=accessInfos;
      console.log(this.accessInfos);

      this.roleService.getAccessRolesByAccessInfoId(this.accessInfos[0].id).then(accessRoles=> {
        this.accessRoles=accessRoles;
        console.log(this.accessRoles);

        let len=this.accessRoles.length;
        console.log("len:"+len);

        for(var i=0;i<len;i++){
          this.roleService.getRoleByRoleId(this.accessRoles[i].roleId).then(result=> {
            console.log(result);
            roleList.push(result);
            while (roleList.length>=len){
              this.userRoles=roleList;
              console.log(this.userRoles);
              break;
            }
          });

          this.roleService.getPermissionByRoleId(this.accessRoles[i].roleId).then((result) => {
            console.log(result);
            for(var j=0;j<result.length;j++){
              permissionList.push(result[j]);
              console.log(permissionList);

              this.userPermissions=permissionList;
              console.log(this.userPermissions);
            }
          });
        }
      });
    });
  }

  /**
   * 用户信息被点击之后触发的函数
   * @param userInfo
   */
  clickUser(userInfo:UserInfo){
    this.userRoles=null;
    this.userPermissions=null;

    this.cliUser=userInfo;
    console.log(this.cliUser);

    //根据该点击用户的id获取点击用户的所有密码信息
    this.getUserCredentials(this.cliUser.id);

    //根据用户的userId获取当前用户的角色信息
    this.getUserRolesAndPermissionByUserId(this.cliUser.id);
  }

  /**
   * 将用户界面的搜索框中的数据进行重置
   */
  resetUserInput(){
    this.inputUsername=null;
    this.getUserList();
  }

  /**
   * 添加用户的密码信息
   */
  submitUserCredential(){
    console.log(this.userCredential);
    if(this.userCredential.password==this.userCredential.repassword){
      console.log("提交密码")
      console.log(this.cliUser);

      this.userCredential.userId=this.cliUser.id;
      this.userCredential.credentialKey=this.userCredential.password;

      console.log(this.userCredential);
      this.userService.addCredential(this.userCredential).subscribe((result) => {
        console.log(result);
        //根据该点击用户的id获取点击用户的所有密码信息
        this.getUserCredentials(this.cliUser.id);
      });
    }
  }

  /**
   * 设置密码的类型
   * @param value
   */
  setUserCredentialType(){
    if(this.userCredential.credentialType=="PASSWORD"){
      console.log("设置密码");
      this.showPassInput=true;
    }else{
      console.log("设置API_KEY");
      this.showPassInput=false;
    }
    console.log(this.userCredential.credentialType);
  }

  /**
   * 这是点击的用户的密码信息
   * @param userCredentialInfo
   */
  getUserCredentialInfo(userCredentialInfo:Credential){
    this.cliUserCredential=userCredentialInfo;
  }

  /**
   * 提交用户的修改密码信息
   */
  submitUpdateUserCredential(){
    console.log(this.cliUserCredential);
    if(this.cliUserCredential.password==this.cliUserCredential.repassword){
      this.cliUserCredential.credentialKey=this.cliUserCredential.password;

      console.log(this.cliUserCredential);
      this.userService.updateCredential(this.cliUserCredential).subscribe((result) => {
        console.log(result);
        //根据该点击用户的id获取点击用户的所有密码信息
        this.getUserCredentials(this.cliUser.id);
      });
    }
  }

  /**
   * 获取点击之后的用户密码的id
   * @param userCredential
   */
  getUserCredentialId(userCredential:Credential){
    this.delUserCredentialId=userCredential.id;
  }

  /**
   * 删除该条用户的密码信息
   */
  deleteUserCredential(){
    console.log(this.delUserCredentialId);
    this.userService.deleteUserCredential(this.delUserCredentialId).subscribe((result) => {
      console.log(result);
      this.getUserCredentials(this.cliUser.id);
    });
  }


  /**
   * 在用户界面点击添加角色信息之后提交角色信息
   */
  submitUserRole(){
    console.log(this.userRoleId);
    let accessInfo:AccessInfo=new AccessInfo();
    accessInfo.userId=this.cliUser.id;
    this.userService.addAccessInfo(accessInfo).subscribe((result) => {
      console.log(result);
      accessInfo=result;

      let accessRole:AccessRole=new AccessRole();
      accessRole.accessInfoId=accessInfo.id;
      accessRole.roleId=this.userRoleId;
      console.log(accessRole);
      this.roleService.addAccessRole(accessRole).subscribe((result) => {
        console.log(result);
      });
    });

  }


}
