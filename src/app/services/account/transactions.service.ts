import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, shareReplay} from 'rxjs';
import {AppConfig} from '../../modals/app-config';
import {Router} from '@angular/router';
import {UserInfoService} from '../auth/user-info.service';
import {ApiRequestService} from '../auth/api-request.service';
import {AccountTransaction} from '../../modals/AccountTransaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  categorySearch: BehaviorSubject<AccountTransaction> = new BehaviorSubject(null);

  constructor(
    private appConfig: AppConfig,
    private http: HttpClient,
    private router: Router,
    private userInfoService: UserInfoService,
    private apiRequestService: ApiRequestService
  ) {
  }


  /*getTransactions(size?: number): Observable<any> {
    return this.http.get(this.appConfig.baseAccountTransationPath + 'getAllOperations' + `?size"=${size}`, {headers: this.apiRequestService.getHeaders()});
  }*/

  getTransactions(page?, size?): Observable<any> {


    let searchUrl = `${this.appConfig.baseAccountTransationPath}getAllOperations?page=` + `${page}` + `&size=${size}`;
    // let searchUrl = `${this.appConfig.baseAccountTransationPath}getAllOperations?` + `size=${size}`;
    return this.http.get(searchUrl, {headers: this.apiRequestService.getHeaders()});
  }


  getTransactionss(): Observable<any> {

    let searchUrl = `${this.appConfig.baseAccountTransationPath}getAllOperations`;
    // let searchUrl = `${this.appConfig.baseAccountTransationPath}getAllOperations?` + `size=${size}`;
    return this.http.get(searchUrl, {headers: this.apiRequestService.getHeaders()});
  }


  getInitialTransactions(): Observable<any> {
    return this.http.get(this.appConfig.baseAccountTransationPath + 'getAllOperations', {headers: this.apiRequestService.getHeaders()}).pipe(shareReplay(1));
  }

  postTransaction(dataBody) {
    return this.http.post(this.appConfig.baseAccountTransationPath + 'createOperation', dataBody, {headers: this.apiRequestService.getHeaders()});
  }

  deleteOperation(id: number) {
    return this.http.delete(this.appConfig.baseAccountTransationPath + 'deleteOperation/' + id, {headers: this.apiRequestService.getHeaders()});
  }


  updateOperation(id: number, dataBody) {
    return this.http.put(this.appConfig.baseAccountTransationPath + 'updateOperation/' + id, dataBody, {headers: this.apiRequestService.getHeaders()});

  }
}
