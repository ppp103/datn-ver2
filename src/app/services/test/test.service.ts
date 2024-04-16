import { Injectable } from '@angular/core';
import { RepositoryEloquentService } from '../base/base-service.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
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

  public getPaggingData(param: any) {
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Test/Pagging`,
    });
    return this.getDataFromServer(param);
  }

  public addTest(param: any) {
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Test`,
    });
    return this.addItem(param);
  }

}
