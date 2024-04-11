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
}

// import { Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { PageResult } from '../../models/page-result';
// import { Question } from '../../models/question';
// @Injectable({
//   providedIn: 'root',
// })
// export class QuestionService {
//   private baseUrl: string = environment.apiEndPoint;

//   constructor(private http: HttpClient) {}

//   // getDataFromAPI() {
//   //   this.http.get(`${this.baseUrl}Question`).subscribe({
//   //     next: (data) => {
//   //       console.log(data); // Process the data here
//   //       return data;
//   //     },
//   //     error: (error) => {
//   //       console.error('Error fetching data:', error);
//   //     }
//   //   });
//   // }

//   getDataFromAPI(): Observable<any> {
//     return this.http.get<Question[]>(`${this.baseUrl}Question`);
//   }

//     /**
//    * Add new item into list data
//    * @param {Object} body The data input.
//    * @returns {Observable}
//    */
//     // public addItem(body: any): Observable<Question> {
//     //   Object.keys(body).map(key => {
//     //     body[key] = typeof body[key] === 'string' ? body[key].trim() : body[key];
//     //   });
//     //   try {
//     //     return this.httpClient.post<typeof inputModelName>(
//     //       this.apiUrl,
//     //       this.clearnBody(body),
//     //       this.getOptions()
//     //     );
//     //   } catch (error) {

//     //   }
//     // }

//   // public getQuestionListByPart(
//   //   page: number,
//   //   size: number,
//   //   partId: number
//   // ): Observable<PageResult<Question>> {
//   //   const pageParams = new HttpParams()
//   //     .set('page', page.toString())
//   //     .set('size', size.toString());
//   //   return this.http.get<PageResult<Question>>(
//   //     `${this.baseUrl}/parts/${partId}/questions`,
//   //     { params: pageParams }
//   //   );
//   // }

//   // public getQuestionListByPartNotDeleted(
//   //   page: number,
//   //   size: number,
//   //   partId: number
//   // ): Observable<PageResult<Question>> {
//   //   const pageParams = new HttpParams()
//   //     .set('page', page.toString())
//   //     .set('size', size.toString());
//   //   return this.http.get<PageResult<Question>>(
//   //     `${this.baseUrl}/parts/${partId}/questions/false/deleted`,
//   //     { params: pageParams }
//   //   );
//   // }

//   public createQuestion(
//     question: Question,
//     // questionType: string,
//     // partId: number
//   ): Observable<Question> {
//     // const reqParams = new HttpParams()
//     //   .set('questionType', questionType.toString())
//     //   .set('partId', String(partId));
//     return this.http.post<Question>(`${this.baseUrl}Question`, question);
//   }

//   // public getQuestionById(id: number): Observable<Question> {
//   //   return this.http.get<Question>(`${this.baseUrl}/questions/${id}`);
//   // }

//   // deleteQuestion(id: number, deleted: boolean): Observable<any> {
//   //   console.log(deleted);
//   //   return this.http.get(`${this.baseUrl}/questions/${id}/deleted/${deleted}`);
//   // }
// }
