import { Injectable } from '@angular/core';
import { RepositoryEloquentService } from '../base/base-service.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TopicService extends RepositoryEloquentService {
  constructor(public override httpClient: HttpClient) {
    super();
    this.setServiceInfo({
      httpClient,
      inputModelName: null,
      outputModelName: null,
      apiUrl: `${environment.apiEndPoint}Topic`,
    });
  }

  public checkBeDeleted(id: number) {
    return 'ok';
  }

  getTopicTree(){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Topic`,
    });

    return this.getFetchAll();
  }

  getFlatList(param: any = ''){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Topic/get-flat-topic`,
    });

    return this.getFetchAll(param);
  }

  updateTopic(param: any){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Topic`,
    });

    return this.updateItem(param);
  }

  createTopic(param: any){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Topic`,
    });
    return this.addItem(param)
  }
}