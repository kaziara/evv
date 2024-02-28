import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '../services/auth/login.service';
import {UserInfoService} from '../services/auth/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {

  constructor(private loginService: LoginService,
              private userInfoService: UserInfoService,
              private route: Router
  ) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!this.userInfoService.isLoggedIn()) {
      this.route.navigate(["/login"]).then()
      return false;
    }
    return true;


  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | boolean {
    return this.canActivate(childRoute, state);
  }

  checkLogin(url: string): boolean {
    if (this.userInfoService.isLoggedIn()) {
      return true;
    }

    this.loginService.landingPage = url;
    this.route.navigate(['login']);
    return false;

  }


}
