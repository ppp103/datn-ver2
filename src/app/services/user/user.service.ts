import { Injectable } from '@angular/core';
import { RepositoryEloquentService } from '../base/base-service.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService extends RepositoryEloquentService {
  constructor(public override httpClient: HttpClient,
  ) {
    super();
    this.setServiceInfo({
      httpClient,
      inputModelName: null,
      outputModelName: null,
      apiUrl: `${environment.apiEndPoint}User`,
    });
  }

  public checkBeDeleted(id: number) {
    return 'ok';
  }

  public registerUser(param: any){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}User/register`,
    });

    return this.addItem(param);
  }

  public login(param: any){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}User/login`,
    });

    return this.addItem(param);
  }

  public getAllUser(param: any = {}){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}User`,
    });

    return this.getFetchAll(param)
  }

  public getUserById(id: number){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}User`,
    });

    return this.getById(id)
  }

  public updateUserStatus(param: any){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}User/update-status`,
    });

    return this.updateItem(param)
  }

  public deleteUser(id: any){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}User`,
    });

    return this.deleteItem({Id: id});
  }

  public updatePassword(param: any){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}User/update-password`,
    });

    return this.updateItem(param);
  }
  public updatePasswordAdmin(param: any){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}User/update-password-admin`,
    });

    return this.updateItem(param);
  }

  public updateAvatar(param: any){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}User/update-avatar`,
    });

    return this.updateItem(param);
  }

  public updateAvatarFile(formData: FormData): Observable<any>{
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}User/update-avatar`,
    });

    return this.httpClient.put(this.apiUrl, formData);;
  }


  public updateEmail(param: any){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}User/update-email`,
    });

    return this.updateItem(param);
  }

  public forgetPassword(param: any){
    this.setServiceInfo({
      apiUrl: `${environment.apiEndPoint}User/forget-password`,
    });

    return this.addItem(param);
  }
}