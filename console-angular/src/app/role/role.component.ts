import { Component, OnInit } from '@angular/core';
import {RoleInfo, RolePermissionInfo} from '../entity/role-info';
import {RoleService} from './role.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  //--------role相关的变量信息--------//
  public roleInfos:RoleInfo[];
  public role:RoleInfo;
  public aRole:RoleInfo=new RoleInfo();
  public delRoleId:string;
  public cliRole:RoleInfo;
  public inputRolename:string;

  public rolePermissions:RolePermissionInfo[];
  public optlock:number;

  constructor(
    private roleService : RoleService,
    private router : Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userId')==null||localStorage.getItem('userId').length==0){
      console.log("home2..");
      this.router.navigate(['/login']);
    }
    this.getRoleList();
  }

  //-------------------Role Action ------------------//
  /**
   * 得到所有的角色信息
   */
  getRoleList(){
    this.roleService.getRoles(this.inputRolename).subscribe((result) => {
      console.log(result);
      this.roleInfos=result.items.item;
    });
  }

  /**
   * 得到当前的role信息
   * @param roleInfo
   */
  getRoleInfo(roleInfo:RoleInfo){
    console.log(roleInfo);
    this.role=roleInfo;
  }

  /**
   * 更新角色信息
   */
  updateRole(){
    console.log("optlock1:"+this.role.optlock);
    if(this.optlock==this.role.optlock+1){
      this.role.optlock+=1;
    }
    this.roleService.updateROleById(this.role.id,this.role).subscribe((result) => {
      this.role=result;
      this.optlock=this.role.optlock;
      console.log(result);
      this.getRoleList();
      this.router.navigate(['/home/role']);
    });
  }

  /**
   * 添加角色信息
   */
  addRole(){
    console.log(this.aRole);
    this.roleService.addRole(this.aRole).subscribe((result) => {
      console.log(result);
      this.getRoleList();
      this.router.navigate(['/home/role']);
    });

  }

  /**
   * 通过当前点击的角色的信息来获取该角色的id
   * @param roleInfo
   */
  getRoleId(roleInfo:RoleInfo){
    console.log(roleInfo);
    this.delRoleId=roleInfo.id;
    console.log(this.delRoleId);
  }

  /**
   * 通过点击角色的id信息来删除角色信息
   */
  deleteRole(){
    console.log(this.delRoleId);
    this.roleService.deleteRoleByRoleId(this.delRoleId).subscribe((result) => {
      console.log(result);
      this.getRoleList();
      this.router.navigate(['/home/role']);
    });
  }

  /**
   * 获取用户点击的角色的信息
   * @param roleInfo
   */
  clickRole(roleInfo:RoleInfo){
    this.cliRole=roleInfo;
    console.log(this.cliRole);

    //获取当前角色的所有权限信息
    this.roleService.getRolePermissionByRole(this.cliRole.id).subscribe((result) => {
      console.log(result);
      this.rolePermissions=result.items.item;
      console.log(this.rolePermissions);
    });

    //获取当前角色的子用户
    /*let len=this.userInfos.length;
    for(var i=0;i<len;i++){
      this.userInfos[i]
    }*/

    //获取当前所有的domain信息


  }

  /**
   * 将角色搜索界面的输入框重置
   */
  resetRoleInput(){
    this.inputRolename=null;
    this.getRoleList();
  }



}
