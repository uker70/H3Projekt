import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { UserDTO, CreateDTOFromUser, CreateDTOFromUsers, CreateUserFromDTO, CreateUsersFromDTO } from '../../dto/user-dto/user.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiEndpoint: string = `${environment.apiBaseUrl}/user`;

  constructor(private http: HttpClient) { 
  }

  public createUser(data: User): Observable<User> {

    let postObj: UserDTO = CreateDTOFromUser(data);

    return this.http.post<User>(this.apiEndpoint, postObj);
  }

  public deleteUser(id: number): Observable<Object> 
  {
    return this.http.delete(`${this.apiEndpoint}/${id}`);
  }

  public getUsers(): Observable<User[]>
  {
    return this.http.get<UserDTO[]>(this.apiEndpoint)
    .pipe(
      map((dto) => {
        return CreateUsersFromDTO(dto);
      })
    );
  }

  public getUser(id: number): Observable<User>
  {

    if(!id) {
      return new Observable<User>((subscriber) => {
        subscriber.next(null)
      });
    }

    return this.http.get<UserDTO>(`${this.apiEndpoint}/${id}`)
    .pipe(
      map((dto) => {
        return CreateUserFromDTO(dto);
      })
    );
  }
}
