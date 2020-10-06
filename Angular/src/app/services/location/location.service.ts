
import { Location } from '../../models/location/location.model';
import { LocationDTO, CreateDTOFromLocation, CreateDTOFromLocations, CreateLocationFromDTO, CreateLocationsFromDTO } from '../../dto/location-dto/location.dto';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private readonly apiEndpoint: string = `${environment.apiBaseUrl}/aobe_locations`;

  constructor(private http: HttpClient) { 
  }

  public getLocation(id: number) : Observable<Location>
  {

    if(!id) {
      return new Observable<Location>((subscriber) => {
        subscriber.next(null)
      });
    }

    return this.http.get<LocationDTO>(`${this.apiEndpoint}/${id}`)
    .pipe(
      map((dto) => {
        return CreateLocationFromDTO(dto);
      })
    );
  }

  public getLocations(): Observable<Location[]> {
    return this.http.get<LocationDTO[]>(this.apiEndpoint)
    .pipe(
      map((dtoArr) => {
        return CreateLocationsFromDTO(dtoArr);
      })
    );
  }

  public createLocation(data: Location): Observable<Location> {

    let postObj: LocationDTO = CreateDTOFromLocation(data);

    return this.http.post<Location>(this.apiEndpoint, postObj);
  }

  public deleteLocation(id: number): Observable<Location> {
    return this.http.delete<Location>(`${this.apiEndpoint}/${id}`);
  }

}
