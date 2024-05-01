import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  public isJson(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  public getItem(key: string) {
    if(typeof localStorage !== 'undefined'){
      const data : any = localStorage.getItem(key);
      return this.isJson(data) ? JSON.parse(data) : data;
    }
  }

  public setItem(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public removeItems(key: []) {
    if (key.length === 0) {
      key.map((k: string) => {
        localStorage.removeItem(k);
      });
    }
  }

  public removeAll() {
    localStorage.clear();
  }
}

export function getApiUrl(nameApi: string): any {
  const localStorage = new LocalStorageService();
  const data = localStorage.getItem('ENVIRONMENT')[nameApi];
  // return localStorage.isJson(data) ? JSON.parse(data) : data;
  return data;
}
