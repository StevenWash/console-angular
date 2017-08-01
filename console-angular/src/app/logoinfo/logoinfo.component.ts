import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-logoinfo',
  templateUrl: './logoinfo.component.html',
  styleUrls: ['./logoinfo.component.css']
})
export class LogoinfoComponent implements OnInit {

  public displayName:string;
  public email:string;

  constructor(
    private loginService : LoginService,
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userId')==null||localStorage.getItem('userId').length==0){
      console.log("home2..");
      this.router.navigate(['/login']);
    }
    this.getLoginUser();
  }

  /**
   * 通过用户名获取用户信息
   * @param name
   */
  getLoginUser(){
    this.userService.getLoginUser().subscribe((result) => {
      this.displayName=result.displayName;
      this.email=result.email;
    });
  }

  /**
   * 用户进行登出操作
   */
  logout(){
    console.log("logout....");
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
