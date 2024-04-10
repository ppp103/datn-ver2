import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { Observable, throwError, Subject, of } from 'rxjs';

let inputModelName: any;
let outputModelName: any;

@Injectable({
  providedIn: 'root',
})
export class RepositoryEloquentService extends Subject<DataStateChangeEventArgs> {
  public Keyword = '';
  public apiUrl: any;

  public httpClient!: HttpClient;
  public headers: HttpHeaders = new HttpHeaders({
    Accept: 'multipart/form-data',
    'Content-Type': 'application/json; charset=utf-8',
  });

  public setServiceInfo(serviceInfo: any) {
    this.apiUrl = serviceInfo.apiUrl ? serviceInfo.apiUrl : this.apiUrl;
    this.httpClient = serviceInfo.httpClient
      ? serviceInfo.httpClient
      : this.httpClient;
    inputModelName = serviceInfo.inputModelName
      ? serviceInfo.inputModelName
      : inputModelName;
    outputModelName = serviceInfo.outputModelName
      ? serviceInfo.outputModelName
      : outputModelName;
  }

  /**
   * Get options
   * @param reportProgress Boolean report progress
   * @returns options any
   */
  getOptions(reportProgress: boolean = false): any {
    let headers = this.headers;

    let options: any = {
      headers: headers,
    };

    if (reportProgress) {
      options.observe = 'events';
      options.reportProgress = true;
    }

    return options;
  }

  /**
   * Return query string from object
   * @param obj Object
   * @returns String
   */
  // tslint:disable-next-line: ban-types
  public convertObjectToQueryString(obj: any) {
    return Object.keys(obj)
      .map((key) => {
        obj[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key];
        return key + '=' + encodeURIComponent(obj[key]);
      })
      .join('&');
  }

  public getById(id: any): Observable<typeof inputModelName> {
    try {
      return this.httpClient.get<typeof inputModelName>(
        `${this.apiUrl}\\${id}`,
        this.getOptions()
      );
    } catch (error) {
      // Xử lý lỗi ở đây nếu cần
      console.error('Error:', error);
      // Trả về một observable có giá trị null hoặc undefined nếu xảy ra lỗi
      return of(null);
    }
  }

  /**
   * Fetch all data
   * @returns {Promise}
   */
  public getFetchAll(params = {}) {
    try {
      const queryString = this.convertObjectToQueryString(params);
      return this.httpClient.get(`${this.apiUrl}?${queryString}`, this.getOptions()).toPromise();
    } catch (error) {
      console.log(error);
      return;
    }
    }

      /**
   * Add new item into list data
   * @param {Object} body The data input.
   * @returns {Observable}
   */
  public addItem(body: any): Observable<typeof inputModelName> {
    Object.keys(body).map(key => {
      body[key] = typeof body[key] === 'string' ? body[key].trim() : body[key];
    });
    try {
      return this.httpClient.post<typeof inputModelName>(
        this.apiUrl,
        this.clearnBody(body),
        this.getOptions()
      );
    } catch (error) {
      return of(null);
    }
  }

    /**
   * Trim string
   * @param body Post data
   * @returns Object
   */
    clearnBody(body: any) {
      Object.keys(body).map(key => {
        body[key] = (typeof body[key] === 'string') ? body[key].trim() : body[key];
        return body[key];
      });
      return body;
    }
}
