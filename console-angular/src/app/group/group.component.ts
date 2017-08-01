import { Component, OnInit } from '@angular/core';
import {GroupInfo} from '../entity/group-info';
import {GroupService} from './group.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  //--------group相关的变量信息--------//
  public groupInfos:GroupInfo[];
  public aGroup:GroupInfo=new GroupInfo();
  public group:GroupInfo;
  public delGroupId:string;
  public cliGroup:GroupInfo;
  public inputGroupname:string;
  public devicegroup:GroupInfo;
  public optlock:number;

  constructor(
    private groupService : GroupService,
    private router : Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userId')==null||localStorage.getItem('userId').length==0){
      console.log("home2..");
      this.router.navigate(['/login']);
    }
    this.getGroupList();
  }

  //--------------------Group Action---------------------------//
  /**
   * 得到所有的组信息
   */
  getGroupList(){
    this.groupService.getGroupList(this.inputGroupname).subscribe((result) => {
      console.log(result);
      this.groupInfos=result.items.item;
    });
  }

  /**
   * 添加组信息
   */
  addGroup(){
    console.log(this.aGroup);
    this.groupService.addGroup(this.aGroup).subscribe((result) => {
      console.log(result);
      this.getGroupList();
      this.router.navigate(['/home/group']);
    });
  }

  /**
   * 得到用户当前点击的组的信息
   * @param groupInfo
   */
  getGroupInfo(groupInfo:GroupInfo){
    console.log(groupInfo);
    this.group=groupInfo;
  }

  /**
   * 更新的用户当前的点击小组
   */
  updateGroup(){
    console.log("optlock1:"+this.group.optlock);
    if(this.optlock==this.group.optlock+1){
      this.group.optlock+=1;
    }
    this.groupService.updateGroupById(this.group.id,this.group).subscribe((result) => {
      this.group=result;
      this.optlock=this.group.optlock;
      console.log("optlock2:"+this.group.optlock);
      console.log(result);
      this.getGroupList();
      this.router.navigate(['/home/group']);
    });
  }

  /**
   * 获取点击删除的小组的id
   * @param groupInfo
   */
  getGroupId(groupInfo:GroupInfo){
    console.log(groupInfo);
    this.delGroupId=groupInfo.id;
    console.log(this.delGroupId);
  }

  /**
   * 通过之前获取的用户点击的小组的id来删除小组的信息
   */
  deleteGroup() {
    console.log(this.delGroupId);
    this.groupService.deleteGroupByGroupId(this.delGroupId).subscribe((result) => {
      console.log(result);
      this.getGroupList();
      this.router.navigate(['/home/group']);
    });
  }

  /**
   * 为添加设备中的设备分组进行设置用户选择的组别
   */
  setGroup(){
    this.devicegroup=this.group;
    console.log(this.devicegroup);
  }

  /**
   * 获得用户点击的小组的信息
   * @param groupInfo
   */
  clickGroup(groupInfo:GroupInfo){
    this.cliGroup=groupInfo;
    console.log(this.cliGroup);
  }

  /**
   * 将小组的搜索框的输入信息重置
   */
  resetGroupInput(){
    this.inputGroupname=null;
    this.getGroupList();
  }
}
