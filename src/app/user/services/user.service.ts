import { Injectable } from '@angular/core';
const users: Array<any> = [
  {
    login: 'bond',
    password: '007',
  },
  {
    login: 'bonissel',
    password: 'oss117',
  },
];
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: any = undefined;
  public get user(): any {
    const jsonUser: string | null = sessionStorage.getItem('auth-key'); //on récupere ici la clé, si je n'en trouve pas je te return un null
    if (jsonUser !== null) {
      this._user = JSON.parse(jsonUser); //JSON.parse => converti la chaine de characters en un véritable object
    }
    return this._user;
  }

  constructor() {}

  public authenticate(credentials: any): boolean {
    this._user = users.find(
      (user: any) =>
        user.login === credentials.login &&
        user.password === credentials.password
    );

    //localStorage même coupe les informations coupée resterons
    // sessionStorage dès que le navigateur est coupé les données disparaisent et devra se relog
    if (this._user) {
      sessionStorage.setItem('auth-key', JSON.stringify(credentials)); // peut stoquer que des chaines de characters
    }
    return this._user !== undefined;
  }
}
