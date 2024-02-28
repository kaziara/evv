import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import * as _ from "lodash";
import {AccountInfo} from "../../../modals/AccountInfo";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userInfoForm;
  formData: AccountInfo;
  name;


  constructor(
    private fb: FormBuilder,
    private userService: UserService) {
  }

  async ngOnInit() {

    await this.getuserInfos()

    this.initializeForm();
    this.populatate();
    this.userNameData();



    //console.log(this.formData)
  }


  async getuserInfos() {
    await this.userService.getUserInfo().then(data => {
      this.formData = data;
    })
  }

  async initializeForm() {
    this.userInfoForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      postCode: [null, Validators.required],

    });
  }

  populatate() {
    let rawData = this.formData;
    if (rawData != null) {

      //rawData = _.omit(rawData, 'operationDate',);
      // console.log(rawData);
      // console.log(rawData);
      // this.userInfoForm.patchValue(rawData);
      let a = _.omitBy(rawData, (v) => _.isUndefined(v) || _.isNull(v) || v === '');
      // console.log(a)
      this.userInfoForm.patchValue(
        _.omitBy(rawData, (v) => _.isUndefined(v) || _.isNull(v) || v === ''));
    }
  }

  onUpdate() {
    this.userService.updateUserInfo(this.userInfoForm.value).subscribe()

  }

  userNameData() {
    if (this.userInfoForm.get('firstName').value == null || this.userInfoForm.get('lastName').value == null) {
      this.name = this.userInfoForm.get('username').value
    }
    this.name = this.userInfoForm.get('firstName').value + " " + this.userInfoForm.get('lastName').value
  }


}
