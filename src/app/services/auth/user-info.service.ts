import {Injectable} from '@angular/core';


export interface UserInStorage {
  username?: string;
  token?: string;
}

export interface LoginInfoInStorage {
  success: boolean;
  landingPage: string;
  user?: UserInStorage;
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  public currentUserKey: string = 'currentUser';
  public storage: Storage = localStorage; // <--- you may switch between sessionStorage or LocalStorage (only one place to change)

  constructor() {
  }

  //Store userinfo from session storage
  storeUserInfo(userInfoString: string) {
   // console.log('storing infos');
    //console.log(userInfoString)
    this.storage.setItem(this.currentUserKey, userInfoString);
    /* console.log('user Infos from store:' + userInfoString);
     console.log('it worked');*/
  }

  //Remove userinfo from session storage
  removeUserInfo() {
    this.storage.removeItem(this.currentUserKey);
  }

  //Get userinfo from session storage
  getUserInfo(): string | null {
    try {
      let userInfoString: string = this.storage.getItem(this.currentUserKey);
     // console.log("this userInfo strings ")
     // console.log(userInfoString)
      if (userInfoString) {
        let userObj: UserInStorage = JSON.parse(this.storage.getItem(this.currentUserKey));
       // console.log('user infos from getUserInfo: ' + userObj);
      //  console.log(userObj)
        return userObj.token;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }

  }

  isLoggedIn(): boolean {
 //   console.log('we are in isLoggedIn');
   // console.log(!!this.storage.getItem(this.currentUserKey))
    return !!this.storage.getItem(this.currentUserKey);
  }

  //Get User's Display name from session storage
 /* getUserName(): string {
    let userObj: UserInStorage = this.getUserInfo();
    if (userObj !== null) {
      return userObj.username;
    }
    return 'no-user';
  }*/

 /* getStoredToken(): string {
    let userObj: UserInStorage = this.getUserInfo();
    //console.log('ubeobj: ' + userObj);
    if (userObj !== null) {
      //console.log('the stored tocken is the method' + userObj.token);
      return userObj.token;
    }
    return null;
  }*/


}
