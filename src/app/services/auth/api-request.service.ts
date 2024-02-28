import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AppConfig} from '../../modals/app-config';
import {UserInfoService} from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  //token= this.loginService.loginInfoReturn.user.token;

  headers = new HttpHeaders({'authorization': 'Bearer ' + this.userInfoService.getUserInfo()});

  constructor(private appConfig: AppConfig,
              private http: HttpClient,
              private router: Router,
              private userInfoService: UserInfoService) {


  }

  get(url: string, urlParams?: HttpParams) {
    let me = this;


    return this.http.get(this.appConfig.baseAuthApiPath + url, {headers: this.headers})

      .pipe(catchError(function (error: any) {

        if (error.status === 401 || error.status === 403) {
          me.router.navigate(['/logout']);
        }
        return throwError(error || 'Server error');
      }));
  }

  post(url: string, body: object): Observable<any> {
    let me = this;

    return this.http.post(this.appConfig.baseAuthApiPath + url, body, {observe: 'response'})
      .pipe(catchError(function (error: any) {


        if (error.status === 401) {
          me.router.navigate(['/login']);
        }
        return throwError(error || 'Server error');
      }));
  }

  getHeaders() {
    return this.headers;
  }
}
