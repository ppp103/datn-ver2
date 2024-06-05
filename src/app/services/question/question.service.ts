import { Injectable } from '@angular/core';
import { RepositoryEloquentService } from '../base/base-service.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class QuestionService extends RepositoryEloquentService {
  constructor(public override httpClient: HttpClient) {
    super();
    this.setServiceInfo({
      httpClient,
      inputModelName: null,
      outputModelName: null,
      apiUrl: `${environment.apiEndPoint}Question/Pagging`,
    });
  }

  public checkBeDeleted(id: number) {
    return 'ok';
  }

  public addQuestion(param: any) {
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Question`,
    });

    return this.addItem(param);
  }

  public getPaggingData(param: any, search: any){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Question/Pagging`,
    });
    return this.getDataFromServer(param, search);
  }

  public getQuestions(param: any){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Question`,
    });
    return this.getFetchAll(param);
  
  }

  public updateQuestion(param: any){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Question`,
    });

    return this.updateItem(param);
  }

  public getQuestionById(id: number) {
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Question`,
    });

    return this.getById(id);
  }

  public deleteQuestion(id: any) {
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Question`,
    });
    return this.deleteItem({ id });
  }

  public getQuestionByTestId(id: number){
        this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}Question/get-questions-by-test-id`,
    });
    return this.getById(id)
  }
}
