import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})


export class TokenStorageService {

  constructor() {
  }

  signOut() {
    window.localStorage.clear();
    // window.location.reload();
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() {
    return localStorage.getItem(TOKEN_KEY) ? localStorage.getItem(TOKEN_KEY) : 'No access token';
  }

  public saveUser(user: any) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    // return JSON.parse(localStorage.getItem(USER_KEY));
      // Retrieve the user data from local storage using the key USER_KEY
    const userDataString = localStorage.getItem(USER_KEY);

    // Check if userDataString is null before parsing it
    if (userDataString !== null) {
      return JSON.parse(userDataString);
    } else {
      // Return null or handle the absence of user data in local storage according to your application logic
      return null; // or throw an error, return a default value, etc.
    }
  }

  getTokenExpirationDate(token: string): any {
    const decoded = jwtDecode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: any): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }
}
