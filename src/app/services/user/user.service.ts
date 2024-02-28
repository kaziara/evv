import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppConfig} from "../../modals/app-config";
import {Router} from "@angular/router";
import {UserInfoService} from "../auth/user-info.service";
import {ApiRequestService} from "../auth/api-request.service";
import {AccountInfo} from "../../modals/AccountInfo";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
    private router: Router,
    private userInfoService: UserInfoService,
    private apiRequestService: ApiRequestService) {
  }

  test() {
    //this.auth.loadToken();
    let headers = new HttpHeaders({'authorization': '' + this.apiRequestService.getHeaders()});
  //  console.log(headers)
    const searchUrl = `http://localhost:8087/users/currentUser`;
    return this.http.get(searchUrl, {headers: this.apiRequestService.getHeaders()})
  }

  getUserInfo():Promise<any> {
    return this.http.get(this.appConfig.baseAuthApiPath + "currentUser", {headers: this.apiRequestService.getHeaders()}).toPromise()
  }

  getTransactionTest() {
    // return this.http.get(this.appConfig.baseAccountTransationPath + "getUser")
    return this.http.get(this.appConfig.baseAuthApiPath + "getUser")
  }

  test2() {
    return this.http.get(this.appConfig.baseAuthApiPath + "test")
  }

  updateUserInfo(data) {
    return this.http.put(this.appConfig.baseAuthApiPath + "updateUserInfo", data, {headers: this.apiRequestService.getHeaders()});
  }
}
