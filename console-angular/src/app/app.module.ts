import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { LogoinfoComponent } from './logoinfo/logoinfo.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login/login.service';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { DeviceComponent } from './device/device.component';
import {DeviceConnectionService} from './device/device-connection.service';
import { ConnectionComponent } from './connection/connection.component';
import { UserComponent } from './user/user.component';
import { UserService} from './user/user.service';
import { RoleComponent } from './role/role.component';
import {RoleService} from './role/role.service';
import { GroupComponent } from './group/group.component';
import {GroupService} from './group/group.service';
import { AccountComponent } from './account/account.component';
import {AccountService} from './account/account.service';
import { DataComponent } from './data/data.component';
import { SettingComponent } from './setting/setting.component';
import { MqttclientComponent } from './mqttclient/mqttclient.component';
import { SsoLoginComponent } from './sso-login/sso-login.component';
import {SSOLoginService} from './sso-login/sso.login.service';

const routeConfig: Routes = [
  {path: '', redirectTo : '/login', pathMatch : 'full'},
  {path: 'login', component: LoginComponent },
  {path: 'ssologin', component: SsoLoginComponent },
  {path: 'home', component : HomeComponent ,children : [
    {path: '', redirectTo : '/welcome', pathMatch : 'full'},
    {path: 'welcome', component: WelcomeComponent},
    {path: 'device', component: DeviceComponent},
    {path: 'connection', component: ConnectionComponent},
    {path: 'user', component: UserComponent},
    {path: 'role', component: RoleComponent},
    {path: 'group', component: GroupComponent},
    {path: 'account', component: AccountComponent},
    {path: 'setting', component: SettingComponent},
    {path: 'data', component: DataComponent},
    {path: 'mqttclient', component: MqttclientComponent}
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    LogoinfoComponent,
    HomeComponent,
    WelcomeComponent,
    DeviceComponent,
    ConnectionComponent,
    UserComponent,
    RoleComponent,
    GroupComponent,
    AccountComponent,
    DataComponent,
    SettingComponent,
    MqttclientComponent,
    SsoLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routeConfig)
  ],
  providers: [
    LoginService,
    DeviceConnectionService,
    UserService,
    RoleService,
    GroupService,
    AccountService,
    SSOLoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
