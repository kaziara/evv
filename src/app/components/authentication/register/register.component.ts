import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/auth/login.service';
import {FormValidators} from "../../../validators/form-validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  private errorMsg: string;

  constructor(private fb: FormBuilder,
              private route: Router,
              private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, FormValidators.emailsLenghtAndFormat]],
      password: ['', Validators.required],
    });
  }

  registerUser() {
    this.loginService.register(
      this.registerForm.controls['firstName'].value,
      this.registerForm.controls['lastName'].value,
      this.registerForm.controls['email'].value,
      this.registerForm.controls['password'].value
    ).subscribe(resp => {
      if (!resp.success) {
        // this.errorMsg = 'there is something wrong';
        return;
      }
      this.route.navigate(['/dashboard']);

    });
  }

  loginUser() {
    this.route.navigate(['/login']);
  }
}
