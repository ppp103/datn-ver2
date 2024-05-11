import { Injectable } from '@angular/core';
import { RepositoryEloquentService } from '../base/base-service.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ReportService extends RepositoryEloquentService {
  constructor(public override httpClient: HttpClient) {
    super();
    this.setServiceInfo({
      httpClient,
      inputModelName: null,
      outputModelName: null,
      apiUrl: `${environment.apiEndPoint}Report`,
    });
  }

  public checkBeDeleted(id: number) {
    return 'ok';
  }
  
  public getStatisticByUser(param: any){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Report/get-statistic-by-user`,
    });

    return this.getFetchAll(param)
  }

  public getAdminStatistics(){
        this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Report/get-admin-statistic`,
    });

    return this.getFetchAll()
  }
}