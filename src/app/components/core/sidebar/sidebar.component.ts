import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from "../../../services/auth/login.service";
import {AccountInfo} from "../../../modals/AccountInfo";
import {UserService} from "../../../services/user/user.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/dashboard', title: 'Dashboard', icon: 'assets/img/icons/nav/dashboard.svg', class: ''},

  {path: '/tables', title: 'Tables', icon: 'assets/img/icons/nav/transactions.svg', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public userName;
  userData: AccountInfo;

  constructor(private router: Router,
              private loginService: LoginService,
              private userService: UserService) {
  }

  async ngOnInit() {
     await this.getuserInfos();


    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  async getuserInfos() {
    await this.userService.getUserInfo().then(data => {
      this.userData = data;
    })
  }
}
