import { Injectable } from '@angular/core';
import { RepositoryEloquentService } from '../base/base-service.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PracticeTestService extends RepositoryEloquentService {
  constructor(public override httpClient: HttpClient) {
    super();
    this.setServiceInfo({
      httpClient,
      inputModelName: null,
      outputModelName: null,
      apiUrl: `${environment.apiEndPoint}PracticeTest`,
    });
  }

  public checkBeDeleted(id: number) {
    return 'ok';
  }

  public addPracticeTest(param: any){
    this.setServiceInfo({
        apiUrl: `${environment.apiEndPoint}PracticeTest`,
      });

      return this.addItem(param)
  }

  public getPracticeTestById(id : any){
        this.setServiceInfo({
        apiUrl: `${environment.apiEndPoint}PracticeTest`,
      });

      return this.getById(id)
  }

  public getPracticeTestByTypeId(param:any, query: any = {}){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}PracticeTest/get-practice-test-by-type-id`,
    });

    return this.getDataFromServer(param, query)
  }

  // public getPracticeTestByTypeIdPagging(param:any){
  //   this.setServiceInfo({
  //     apiUrl: `${environment.apiEndPoint}PracticeTest/get-practice-test-by-type-id`,
  //   });

  //   return this.getFetchAll(param)
  // }
}



