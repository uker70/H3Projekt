import { Injectable } from '@angular/core';
import { Staff } from 'src/app/models/staff/staff.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscriber, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { StaffDTO, CreateStaffFromDTO, CreateStaffMemberFromDTO, CreateDTOFromStaff, CreateDTOFromStaffMember } from 'src/app/dto/staff-dto/staff.dto'; 

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private readonly apiEndpoint: string = `${environment.apiBaseUrl}/staff`;

  constructor(private http: HttpClient) { 
  }

  public createStaff(data: Staff): Observable<Staff>
  {
    let postObj: StaffDTO = CreateDTOFromStaffMember(data);

    return this.http.post<Staff>(this.apiEndpoint, postObj);
  }

  public getStaffMember(id: number): Observable<Staff>
  {

    if(!id) {
      return new Observable<Staff>((subscriber) => {
        subscriber.next(null)
      });
    }

    return this.http.get<StaffDTO>(`${this.apiEndpoint}/${id}`)
    .pipe(
      map((staffDto) => {
        return CreateStaffMemberFromDTO(staffDto);
      })
    );
  }

  public deleteStaffMember(id: number): Observable<Object> {
    return this.http.delete(`${this.apiEndpoint}/${id}`);
  }

  public getStaff(): Observable<Staff[]>
  {
    return this.http.get<StaffDTO[]>(this.apiEndpoint)
    .pipe(
      map((staffDto) => {
        return CreateStaffFromDTO(staffDto)
      })
    )
    ;
  }

}
