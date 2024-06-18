import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private data: any;

  constructor() { }

  // Getter for data
  getData(): any {
    return this.data;
  }

  // Setter for data
  setData(newData: any): void {
    this.data = newData;
  }
}