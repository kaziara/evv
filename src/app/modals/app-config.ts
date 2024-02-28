import {Injectable} from '@angular/core';

@Injectable(

)
export class AppConfig {

  public baseUrl;
  public baseAuthApiPath: string;
  public baseAccountTransationPath: string

  constructor() {

    this.baseUrl = "http://localhost:9595/kjj"

    this.baseAuthApiPath = 'https://expencia.fr/users/';
    this.baseAccountTransationPath = 'https://expencia.fr/accounts/';
    //this.baseAuthApiPath = 'http://localhost:8087/users/';
    //this.baseAccountTransationPath = 'http://localhost:8088/accounts/';

  }

}
