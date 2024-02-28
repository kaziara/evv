import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/auth/login.service';
import {AppConfig} from '../../../modals/app-config';
import {HttpClient} from '@angular/common/http';
import {UserInfoService} from '../../../services/auth/user-info.service';
import {ApiRequestService} from '../../../services/auth/api-request.service';
import {FormValidators} from "../../../validators/form-validators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  errorMsg: string;
  a;


  constructor(private fb: FormBuilder,
              private route: Router,
              private loginService: LoginService,
              private appConfig: AppConfig,
              private httpClient: HttpClient,
              private userInfo: UserInfoService,
              private apiService: ApiRequestService) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, FormValidators.emailsLenghtAndFormat]],
      password: ['', Validators.required]
    });

  }

  ngOnDestroy() {
    //this.a.unsubscribe()
  }


  /*loginUser() {
    this.httpClient.post(this.appConfig.baseAuthApiPath + "login", this.loginForm.value).subscribe();
  }*/

  loginUser() {
    //this.route.navigate(['/dashboard']).then(r => true);


     this.loginService.login(this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value)

      .subscribe(resp => {
         // console.log("the response " + resp)
        //  console.log(resp)
          if (resp == undefined) {
            // console.log("we are in the error part")
            this.errorMsg = 'Username or password is incorrect';
            //console.log(this.errorMsg);
            return;
          }
          this.route.navigate(['/dashboard']).then()


        }
      )
    ;


  }

  createAccount() {
    this.route.navigate(['/register']).then(r => this.loginForm);
  }


}
