import {Component, ElementRef, OnInit} from '@angular/core';
import {ROUTES} from '../sidebar/sidebar.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/auth/login.service';
import {ApiRequestService} from '../../../services/auth/api-request.service';
import {UserService} from "../../../services/user/user.service";
import {TransactionsService} from "../../../services/account/transactions.service";
import {AccountInfo} from "../../../modals/AccountInfo";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public userName;
  public focus;
  public listTitles: any[];
  public location: Location;
  userData: AccountInfo;


  constructor(location: Location,
              private element: ElementRef,
              private router: Router,
              private loginService: LoginService,
              private apiService: ApiRequestService,
              private userService: UserService,
              private transactionService: TransactionsService) {
    this.location = location;

  }

  async ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    //this.userName = this.loginService.loginInfoReturn.user.username;
    // this.userName =  this.loginService.getUserInfos();
    await this.getuserInfos();

    //this.userName = this.loginService.getUserInfos()["firstName"]
    //  console.log(this.userData.firstName)

  }

  async getuserInfos() {
    await this.userService.getUserInfo().then(data => {
      this.userData = data;
    })
  }

  showInfo() {
    //this.userService.gettest().subscribe(data => console.log(data))
    this.userService.test().subscribe()
    //this.transactionService.getTransactions(0,2).subscribe(data=>console.log(data))
  }

  getTitle() {

    return 'Dashboard';
  }

  logOut() {

    this.loginService.logout();

  }


  /*showUser() {
    this.loginService.
  }*/
  testApi() {
    this.userService.getUserInfo().then()
  }
}
