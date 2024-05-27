import { Injectable } from '@angular/core';
import { RepositoryEloquentService } from '../base/base-service.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
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

    return this.deleteItem(id);
  }
}