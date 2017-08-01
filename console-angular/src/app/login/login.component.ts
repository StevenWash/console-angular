import { Component, OnInit } from '@angular/core';
import {Credential} from '../entity/credential';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credential = new Credential();

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.credential.setUsername('kapua-sys');
    this.credential.setPassword('kapua-password');
  }

  /**
   * 实现登录操作（进行授权验证）
   */
  login() {
    console.log(this.credential.getUsername() + '  ' + this.credential.getPassword());
    this.loginService.login(this.credential.getUsername(), this.credential.getPassword()).subscribe((result) => {
      if (result) {
        // console.log('来自app.component:'+localStorage.getItem('tokenId'));
        console.log('login success');
        this.router.navigate(['/home/welcome']);
      }
    });
  }

  ssologin() {
    console.log('sso login');
    this.router.navigate(['/ssologin']);
  }

  /**
   * 点击重置按钮后将输入框那个的信息进行重置
   */
  reset() {
    this.credential.setUsername('');
    this.credential.setPassword('');
  }

}
