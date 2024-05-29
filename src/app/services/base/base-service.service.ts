import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DataResult,
  DataStateChangeEventArgs,
} from '@syncfusion/ej2-angular-grids';
import { Observable, throwError, Subject, of } from 'rxjs';
import { retry, map, scan } from 'rxjs/operators';
import { Upload } from '../../constants/constants';

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
  getOptions(reportProgress: boolean = false, isFileUpload: boolean = false): any {
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
   * Upload file with progress event
   * @param {Object} body The form data input.
   * @returns {Observable}
   */
    uploadFile(body: FormData): Observable<any> {
      try {
        const initialState: Upload = { state: 'PENDING', progress: 0 };
        const calculateState = (upload: Upload, event: HttpEvent<unknown>): any => {
          if (isHttpProgressEvent(event)) {
            return {
              progress: event.total
                ? Math.round((100 * event.loaded) / event.total)
                : upload.progress,
              state: 'IN_PROGRESS',
            }
          }
          if (isHttpResponse(event)) {
            return {
              progress: 100,
              state: 'DONE',
              response: event
            }
          }
          return upload;
        }
  
        return this.httpClient
          .post<typeof inputModelName>(this.apiUrl, body, this.getOptions(true, true))
          .pipe(scan(calculateState, initialState));
      } catch (error) {
        return of(null);
  
      }
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
   * Update item
   * @param {Any} body Data input.
   * @returns {Observable}
   */
    public updateItem(body: any): Observable<typeof inputModelName> {
      try {
        return this.httpClient.put<typeof inputModelName>(
          this.apiUrl,
          this.clearnBody(body),
          this.getOptions()
        );
      } catch (error) {
        return of(null);
      }
    }
  

  /**
   * Update item
   * @param {Number} id Item id.
   * @returns {Observable}
   */
  public deleteItem(params = {}): Observable<any> {
    try {
      const queryString = this.convertObjectToQueryString(params);
      return this.httpClient.delete<any>(
        `${this.apiUrl}?${queryString}`,
        this.getOptions()
      );
    } catch (error) {
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
      return this.httpClient
        .get(`${this.apiUrl}?${queryString}`, this.getOptions())
        .toPromise();
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
    Object.keys(body).map((key) => {
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
    Object.keys(body).map((key) => {
      body[key] = typeof body[key] === 'string' ? body[key].trim() : body[key];
      return body[key];
    });
    return body;
  }

  /**
   * Get data from server
   * @param state DataStateChangeEventArgs
   */
  public getDataFromServer(
    state: any,
    params: object = {},
    numOfRetry: number = 0
  ): void {
    this.getData(state, params, numOfRetry).subscribe((x) => {
      super.next(x);
    });
  }

  /**
   * Get data from server
   * @param state DataStateChangeEventArgs
   * @param params Search data
   */
  public getData(
    state: any,
    params: any,
    numOfRetry = 0
  ): Observable<DataStateChangeEventArgs> {
    try {
      if (state.action) {
        // Xử lý tìm kiếm
        if (state.action.requestType === 'searching') {
          if (state.search && state.search.length > 0) {
            this.Keyword = state.search[0].key;
          } else {
            this.Keyword = '';
          }
        }
      }

      // Get query string
      const queryString: any = this.convertObjectToQueryString({
        ...params,
        PageSize: state.take,
        PageNumber: state.skip / state.take + 1,
        Keyword: this.Keyword
          ? this.Keyword.trim()
          : params.Keyword
          ? params.Keyword.trim()
          : '',
      });

      // Get data
      return this.httpClient
        .get(`${this.apiUrl}?${queryString}`, this.getOptions())
        .pipe(retry(numOfRetry))
        .pipe(
          map((response: any) => {
            if (!response) return;

            // Tính toán để ra số thứ tự đúng theo từng trang
            // Trang 1 bắt đầu = 1
            // Trang 2 bắt đầu bằn (2 - 1) * pageZise
            // if(response.paging.pageNumber == 0){
            //   response.paging.pageNumber = 1
            // }
            const sumNumber =
              (response.paging.pageNumber - 1) * response.paging.pageSize;
            // Set serial number
            response.items.map((item: any, index: any) => {
              item.serialNumber = index + 1 + sumNumber;
            });

            // Format data result
            const dataresult = {
              all: response,
              result: response.items,
              pagging: response.paging,
              count: response.paging.totalItems,
            } as DataResult;

            return dataresult;
          })
        )
        .pipe((data: any) => {
          return data;
        });
    } catch (error) {
      return of();
    }
  }
}

function isHttpProgressEvent(event: HttpEvent<unknown>): event is HttpProgressEvent {
  return (
    event.type === HttpEventType.DownloadProgress ||
    event.type === HttpEventType.UploadProgress
  )
}

function isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
  return event.type === HttpEventType.Response
}