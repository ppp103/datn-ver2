import { Injectable } from '@angular/core';
import { RepositoryEloquentService } from '../base/base-service.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TestCategoryService extends RepositoryEloquentService {
  constructor(public override httpClient: HttpClient) {
    super();
    this.setServiceInfo({
      httpClient,
      inputModelName: null,
      outputModelName: null,
      apiUrl: `${environment.apiEndPoint}TestCategory`,
    });
  }

  public checkBeDeleted(id: number) {
    return 'ok';
  }

  public getTestCategory(){
    this.setServiceInfo({
        apiUrl: `${environment.apiEndPoint}TestCategory`,
      });

    return this.getFetchAll();
  }
}