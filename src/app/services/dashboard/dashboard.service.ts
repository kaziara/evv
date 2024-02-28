import {Injectable} from '@angular/core';
import {AppConfig} from '../../modals/app-config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserInfoService} from '../auth/user-info.service';
import {ApiRequestService} from '../auth/api-request.service';
import {BehaviorSubject, Observable, ReplaySubject, shareReplay} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  headers: HttpHeaders = this.apiRequestService.getHeaders();
  tempBalance: [] = [];
  tempIncome: [] = [];
  tempExpense: [] = [];
  tempDate: [] = [];
  tempTransactions: [] = [];

  balance: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);
  income: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);
  expense: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);
  transactions: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);
  operationDate: ReplaySubject<[]> = new ReplaySubject<[]>();
  dataStats: BehaviorSubject<any> = new BehaviorSubject<any>({});
  datatotalExpenses: BehaviorSubject<any> = new BehaviorSubject<any>({});

  // balanceObs = this.balance.asObservable();

  constructor(
    private appConfig: AppConfig,
    private http: HttpClient,
    private router: Router,
    private userInfoService: UserInfoService,
    private apiRequestService: ApiRequestService
  ) {
  }

  getDashboardInfos(): Observable<any> {
 //   console.log("get info called")
    return this.http.get(this.appConfig.baseAccountTransationPath + 'getAccount', {headers: this.headers}).pipe(shareReplay(1));
  }

  getAccountStats(): Promise<any> {
    return this.http.get(this.appConfig.baseAccountTransationPath + 'getMonthlyStats', {headers: this.headers}).toPromise();
  }

  getExpensesStats(): Promise<any> {
    return this.http.get(this.appConfig.baseAccountTransationPath + 'getTotalExpenses', {headers: this.headers}).toPromise();
  }

  async getTotalExpensesStats() {
    let tempCategory: [] = [];
    let tempTotalExpenses: [] = [];
    await this.getExpensesStats().then(data => {

      // console.log(data);
      Object.keys(data).forEach(key => {
        tempCategory[key] = data[key].category;
        tempTotalExpenses[key] = data[key].totalExpenses;
      });

      let statsData = {};
      statsData['totalExpenses'] = tempTotalExpenses;
      statsData['category'] = tempCategory;

      //console.log(statsData);

      this.datatotalExpenses.next(statsData);
    });
  }

  async getAccountStatsArrays() {

    await this.getAccountStats().then(data => {


      Object.keys(data).forEach(key => {
        this.tempBalance[key] = data[key].balance;
        this.tempIncome[key] = data[key].income;
        this.tempExpense[key] = data[key].expense;
        this.tempDate[key] = data[key].transactionDate;
        this.tempTransactions[key] = data[key].transactions;
      });

      let statsData = {};
      statsData['balance'] = this.tempBalance;
      statsData['income'] = this.tempIncome;
      statsData['expense'] = this.tempExpense;
      statsData['operationDate'] = this.tempDate;
      statsData['transactions'] = this.tempTransactions;
      this.dataStats.next(statsData);
    });
  }


}
