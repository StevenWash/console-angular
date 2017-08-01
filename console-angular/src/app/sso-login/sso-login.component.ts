import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SSOLoginService} from './sso.login.service';

@Component({
  selector: 'app-sso-login',
  templateUrl: './sso-login.component.html',
  styleUrls: ['./sso-login.component.css']
})
export class SsoLoginComponent {

  constructor(
    public router: Router ,
    private ssologinService: SSOLoginService
  ){
    let loginUrl:string=ssologinService.getLoginUri();
    console.log('loginUrl:'+loginUrl);
    window.location.href=loginUrl;
  }

}
