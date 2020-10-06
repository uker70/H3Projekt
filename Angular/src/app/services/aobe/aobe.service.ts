import { Injectable } from '@angular/core';
import { AOBE } from '../../models/aobe/aobe.model';
import { AOBEDTO, AOBEPostDTO, AOBEPostResponseDTO, AOBEPutDTO, AOBEPutResponseDTO, CreateAOBEFromDTO, CreateAOBEsFromDTO, CreateDTOFromAOBE, CreateDTOFromAOBEs } from '../../dto/aobe-dto/aobe.dto';
import { LocationService } from '../location/location.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Location } from 'src/app/models/location/location.model';

@Injectable({
  providedIn: 'root'
})
export class AobeService {

  private readonly apiEndpoint: string = `${environment.apiBaseUrl}/aobe`;

  private _aobes: AOBE[];

  constructor(
    private http: HttpClient,
    private _locationService: LocationService) { 
  }

  public getAOBE(id: number): Observable<AOBE> {

    if(!id) {
      return new Observable<AOBE>((subscriber) => {
        subscriber.next(null)
      });
    }

    return this.http.get<AOBEDTO>(`${this.apiEndpoint}/${id}`)
    .pipe(
      map((dto) => {
        return CreateAOBEFromDTO(dto);
      })
    );
  }

  public getAOBEs(): Observable<AOBE[]> {


    let output: AOBE[] = [];

    return new Observable<AOBE[]>(subscriber => {

      this.http.get<AOBEDTO[]>(this.apiEndpoint).subscribe(dtos => {

        dtos.forEach((value, index, arr) => {

          let tmp: AOBE = new AOBE();
          tmp.id = value.aobeId;
          tmp.IPAddress = value.ip;
          tmp.name = value.aobeName;

          // Then grab the location...
          this._locationService.getLocation(value.location).subscribe(locationData => {
            tmp.location = locationData;
          });

          // Then push this element to the output array.
          output.push(tmp);

          // Then if this is the final element resolve the subscriber.
          if(index === arr.length - 1) {
            subscriber.next(output);
          }

        });

      });

    });


    // return this.http.get<AOBEDTO[]>(this.apiEndpoint)
    // .pipe(
    //   map((dto) => {
    //     return CreateAOBEsFromDTO(dto);
    //   })
    // );
  }

  public updateAOBE(data: AOBE): Observable<AOBE> {

    console.log(data);

   let putObj: AOBEPutDTO = new AOBEPutDTO();
   putObj.aobeName = data.name;
   putObj.ip = data.IPAddress;
   putObj.locationId = data.location.id;

   return this.http.put<AOBEPutResponseDTO>(`${this.apiEndpoint}/${data.id}`, putObj)
   .pipe(
     map(dto => {
      let aobe: AOBE = new AOBE();
      aobe.IPAddress = dto.ip;
      aobe.id = dto.id;
      aobe.location = new Location();
      aobe.location.id = dto.location.locationId;
      aobe.location.areaName = dto.location.areaName;
      aobe.name = dto.name;
      return aobe;
     })
   );

  }

  public createAOBE(data: AOBE) : Observable<AOBE> {

    let postObj: AOBEPostDTO = new AOBEPostDTO();
    postObj.ip = data.IPAddress;
    postObj.aobeName = data.name;
    postObj.locationId = data.location.id;

    return this.http.post<AOBEPostResponseDTO>(this.apiEndpoint, postObj)
    .pipe(
      map(dto => {
        let aobe = new AOBE();
        aobe.IPAddress = dto.ip;
        aobe.id = dto.id;
        aobe.location = new Location();
        aobe.location.id = dto.location.locationId;
        aobe.location.areaName = dto.location.areaName;
        aobe.name = dto.name;
        return aobe;
      })
    );
  }

  public deleteAOBE(id: number) : Observable<Object> {
    return this.http.delete(`${this.apiEndpoint}/${id}`);
  }

}
