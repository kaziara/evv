import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {Account} from '../../../modals/account';
import {DashboardService} from '../../../services/dashboard/dashboard.service';
import {TransactionsService} from '../../../services/account/transactions.service';
import {AccountTransaction} from '../../../modals/AccountTransaction';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {DataService} from '../../../services/data/data.service';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, AfterContentInit {

  infos: Account;
  transactions: AccountTransaction[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  balance;
  categoryIcon;
  @Input() dataTemp;

  constructor(private dashboardService: DashboardService,
              private transactionsService: TransactionsService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<TablesComponent>,
              private dataService: DataService) {
  }

  ngAfterContentInit() {

    this.dataService.transactions.subscribe(data => this.transactions = data);
  }


  getBlance() {


    this.dashboardService.balance.subscribe(data => {
      // console.log('from inside getbalance' + data);
    });
  }

  ngOnInit() {
    this.getInfos();
    this.getBlance();
    this.getInitialTransactions();
    this.getTransac()
  }

  getTransac() {
  }

  onCreate() {
    this.config().afterClosed().subscribe(data => {
      //  console.log("************** inside the after close ")
      this.getInfos();
      this.getInitialTransactions();

      // console.log(this.infos);
    });
  }

  onUpdate(data) {
    this.dataService.updateFormData(data);
    this.config().afterClosed().subscribe(data => {
      this.getInitialTransactions();
      this.getInfos();
      this.dataService.updateFormData(null)
    });

  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this transaction')) {
      this.transactionsService.deleteOperation(id).subscribe(data => {
        this.getInitialTransactions();
        this.getInfos();


      });

    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getInfos() {
    this.dashboardService.getDashboardInfos().subscribe(data => {
      this.infos = data;
    });
  }

  getOperations() {
    this.transactionsService.getTransactions(this.pageNumber - 1, this.pageSize).subscribe(data => {
      this.transactions = data.content;
      // console.log(this.transactions)

    });

  }

  getInitialTransactions() {
    this.transactionsService.getInitialTransactions().subscribe(
      this.processDate()
    );
  }

  processDate() {
    return data => {
      this.transactions = data.content;
      this.pageNumber = data.number;

      this.pageSize = data.size;
      this.totalElements = data.totalElements;
    };
  }


  config(): MatDialogRef<DialogComponent, any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    return this.dialog.open(DialogComponent, dialogConfig);
  }

  call(item) {
    let category = item.toLowerCase();
    this.categoryIcon = "assets/img/icons/category/" + category + ".svg";
    //console.log(item.toLowerCase())

  }
}
