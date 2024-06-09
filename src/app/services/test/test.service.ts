import { Injectable } from '@angular/core';
import { RepositoryEloquentService } from '../base/base-service.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TestService extends RepositoryEloquentService {
  constructor(public override httpClient: HttpClient) {
    super();
    this.setServiceInfo({
      httpClient,
      inputModelName: null,
      outputModelName: null,
      apiUrl: `${environment.apiEndPoint}Test`,
    });
  }

  public checkBeDeleted(id: number) {
    return 'ok';
  }

  public getPaggingData(state: any, param: any) {
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Test/Pagging`,
    });
    return this.getDataFromServer(state, param);
  }

  public addTest(param: any) {
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Test`,
    });
    return this.addItem(param);
  }

  public getTestById(id : any){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Test`,
    });
    return this.getById(id);
  }

  public getAllTest(param: any){
        this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Test/Pagging`,
    });
    return this.getFetchAll(param);
  }

  public addTestVer2(param: any) {
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Test`,
    });
    return this.uploadFile(param);
  }

  submitTest(formData: FormData): Observable<any> {
    return this.httpClient.post(this.apiUrl, formData);
  }

  updateTest(formData: FormData): Observable<any> {
    return this.httpClient.put(this.apiUrl, formData);
  }

}
