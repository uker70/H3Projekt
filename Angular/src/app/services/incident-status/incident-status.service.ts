import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IncidentStatus } from '../../models/incident-status/incident-status.model';
import { IncidentStatusDTO, CreateDTOFromIncidentStatus, CreateDTOFromIncidentStatuses, CreateIncidentStatusFromDTO, CreateIncidentStatusesFromDTO } from '../../dto/incident-status-dto/incident-status.dto';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncidentStatusService {

  private readonly apiEndpoint: string = `${environment.apiBaseUrl}/status`;

  constructor(private http: HttpClient) { }

  public getIncidentStatuses(): Observable<IncidentStatus[]>
  {
    return this.http.get<IncidentStatusDTO[]>(this.apiEndpoint)
    .pipe(
      map((dto) => {
        return CreateIncidentStatusesFromDTO(dto);
      })
    );
  }

  public getIncidentStatus(id: number): Observable<IncidentStatus> {

    if(!id) {
      return new Observable<IncidentStatus>((subscriber) => {
        subscriber.next(null)
      });
    }

    return this.http.get<IncidentStatusDTO>(`${this.apiEndpoint}/${id}`)
    .pipe(
      map((dto) => {
        return CreateIncidentStatusFromDTO(dto);
      })
    );
  }

  public deleteIncidentStatus(id: number) : Observable<Object> {
    return this.http.delete(`${this.apiEndpoint}/${id}`);
  }

  public createIncidentStatus(data: IncidentStatus) : Observable<IncidentStatus> {

    let postObj: IncidentStatusDTO = CreateDTOFromIncidentStatus(data);

    return this.http.post<IncidentStatus>(this.apiEndpoint, postObj);
  }

}
