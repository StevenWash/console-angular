import { Component, OnInit } from '@angular/core';
import {AccountInfo} from '../entity/account-info';
import {UserInfo} from '../entity/user-info';
import {Credential} from '../entity/credential';
import {AccountService} from './account.service';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  //--------account相关的变量信息--------//
  public accountInfos:AccountInfo[];
  public aAccount:AccountInfo=new AccountInfo();
  public account:AccountInfo;
  public delAccountId:string;
  public cliAccount:AccountInfo=new AccountInfo();
  public inputAccountName:string;
  public accountUsers:UserInfo[];
  public accountUser:UserInfo;
  public accoptlock:number;
  public aAccountUser:UserInfo=new UserInfo();
  public aAccountCredential:Credential=new Credential();
  public delAccUserId:string;
  public optlock:number;

  constructor(
    private accountService : AccountService,
    private userService : UserService,
    private router :Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userId')==null||localStorage.getItem('userId').length==0){
      console.log("home2..");
      this.router.navigate(['/login']);
    }
    this.getAccountList();
  }

  //--------------------Account Action---------------------------//
  /**
   * 获取当前scopeId下的所有的账号信息
   */
  getAccountList(){
    this.accountService.getAccountList(this.inputAccountName).subscribe((result) => {
      console.log(result);
      this.accountInfos=result.items.item;
    });
  }

  /**
   * 添加一个账号信息
   */
  addAccount(){
    console.log(this.aAccount);
    this.accountService.addAccount(this.aAccount).subscribe((result) => {
      console.log(result);
      this.getAccountList();
      this.router.navigate(['/home/account']);
    });
  }

  /**
   * 得到当前用户点击的账户的信息
   * @param accountInfo
   */
  getAccountInfo(accountInfo:AccountInfo){
    console.log(accountInfo);
    this.account=accountInfo;
  }

  /**
   * 更新当前用户选择的账号信息
   */
  updateAccount(){
    console.log("optlock1:"+this.account.optlock);
    if(this.optlock==this.account.optlock+1){
      this.account.optlock+=1;
    }
    this.accountService.updateAccountById(this.account.id,this.account).subscribe((result) => {
      this.account=result;
      this.optlock=this.account.optlock;
      console.log("optlock2:"+this.account.optlock);
      console.log(result);
      this.getAccountList();
      this.router.navigate(['/home/account']);
    });
  }

  /**
   * 得到被删除的账号信息的id
   * @param accountInfo
   */
  getAccountId(accountInfo:AccountInfo){
    this.delAccountId=accountInfo.id;
  }

  /**
   * 根据之前得到的删除账号的id来进行删除操作
   */
  deleteAccount(){
    console.log(this.delAccountId);
    this.accountService.deleteAccountByAccountId(this.delAccountId).subscribe((result) => {
      console.log(result);
      this.getAccountList();
      this.router.navigate(['/home/account']);
    });
  }

  /**
   * 通过accounId来获取当前账号下的所有的用户信息
   * @param accountId
   */
  getAccountUsers(accountId:string){
    this.accountService.getAccountUsers(accountId).subscribe((result) => {
      console.log(result);
      this.accountUsers=result.items.item;
    });
  }

  /**
   * 获取当前用户点击的账号信息
   * @param accountInfo
   */
  clickAccount(accountInfo:AccountInfo){
    this.cliAccount=accountInfo;
    console.log(this.cliAccount);

    //获得当前点击账号的用户信息
    this.getAccountUsers(this.cliAccount.id);
  }

  /**
   * 获取在Account下用户点击用户信息
   * @param accountUser
   */
  getAccountUserInfo(accountUser:UserInfo){
    this.accountUser=accountUser;
  }

  /**
   * 更新账号下的用户信息
   */
  updateAccountUser(){
    console.log("optlock1:"+this.accountUser.optlock);
    if(this.accoptlock==this.accountUser.optlock+1){
      this.accountUser.optlock+=1;
    }
    this.userService.updateUserById(this.accountUser.id,this.accountUser).subscribe((result) => {
      this.accountUser=result;
      this.accoptlock=this.accountUser.optlock;
      console.log("optlock2:"+this.accountUser.optlock)
      console.log(result);
      this.getAccountUsers(this.cliAccount.id);
      this.router.navigate(['/home/account']);
    });
  }

  /**
   * 添加用户
   */
  addAccountUser(){
    console.log(this.aAccountUser);
    console.log(this.aAccountCredential);

    this.accountService.addAccountUser(this.cliAccount.id,this.aAccountUser).subscribe((result) => {
      console.log(result);

      this.aAccountCredential.userId=result.id;
      this.aAccountCredential.credentialType="PASSWORD";
      this.aAccountCredential.credentialKey=this.aAccountCredential.password;

      console.log(this.aAccountCredential);
      this.accountService.addAccountCredential(this.cliAccount.id,this.aAccountCredential).subscribe((result) => {
        console.log(result);
      });

      this.getAccountUsers(this.cliAccount.id);
      this.router.navigate(['/home/account']);
    });
  }

  /**
   * 获取将要删除的用户的id
   * @param userInfo
   */
  getAccountUserId(userInfo:UserInfo){
    this.delAccUserId=userInfo.id;
  }

  /**
   * 删除账号下的用户信息
   */
  deleteAccountUser(){
    console.log(this.delAccUserId);
    this.accountService.deleteAccountUser(this.cliAccount.id,this.delAccUserId).subscribe((result) => {
      console.log(result);
      this.getAccountUsers(this.cliAccount.id);
      this.router.navigate(['/home/account']);
    });
  }
}
