import { Injectable } from '@angular/core';
import { Incident } from 'src/app/models/incident/incident.model';
import { environment } from 'src/environments/environment';
import { IncidentDTO, IncidentPostDTO, IncidentPostResponseDTO, CreateDTOFromIncident, CreateDTOFromIncidents, CreateIncidentFromDTO, CreateIncidentsFromDTO, IncidentPutDTO } from '../../dto/incident-dto/incident.dto';
import { IncidentStatusDTO, CreateDTOFromIncidentStatus, CreateDTOFromIncidentStatuses, CreateIncidentStatusFromDTO, CreateIncidentStatusesFromDTO } from '../../dto/incident-status-dto/incident-status.dto';
import { LocationDTO, CreateDTOFromLocation, CreateDTOFromLocations, CreateLocationFromDTO, CreateLocationsFromDTO } from '../../dto/location-dto/location.dto';
import { StaffDTO, CreateDTOFromStaff, CreateDTOFromStaffMember, CreateStaffFromDTO, CreateStaffMemberFromDTO } from '../../dto/staff-dto/staff.dto';
import { IncidentStatus } from '../../models/incident-status/incident-status.model';
import { IncidentStatusService } from '../incident-status/incident-status.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { LocationService } from '../location/location.service';
import { StaffService } from '../staff/staff.service';
import { Location } from 'src/app/models/location/location.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private readonly apiEndpoint: string = `${environment.apiBaseUrl}/incident`;
  // incident_case route??? for images...


  constructor(
    private http: HttpClient,
    private _statusService: IncidentStatusService,
    private _locationService: LocationService,
    private _staffService: StaffService,
    //private _imageService: ImageService
    ) { }

  public createIncident(data: Incident): Observable<Incident>
  {
    // let postObj: IncidentDTO = CreateDTOFromIncident(data);

    // TODO tjek med Bjørn.
    let postObj: IncidentPostDTO = new IncidentPostDTO();
    postObj.description = data.description;
    postObj.incidentDate = data.incidentDate;
    postObj.percentage = null;
    postObj.img = null;
    postObj.areaName = data.location.areaName;

    return this.http.post<IncidentPostResponseDTO>(this.apiEndpoint, postObj).pipe(
      map(dto => {
        let incident = new Incident();
        incident.id = dto.id;
        incident.description = dto.description;
        incident.incidentDate = dto.incidentDate;
        incident.percentage = dto.percentage;
        incident.image = dto.img;
        
        incident.location = new Location();
        incident.location.areaName = dto.location.areaName;
        incident.location.id = dto.location.locationId;

        incident.status = new IncidentStatus();
        incident.status.id = dto.status.statusId;
        incident.status.name = dto.status.statusName;

        // And here is where we have to derail since the POST Request response is lacking information.
        // We have to assign this data from the passed in data.
        incident.staff = data.staff;
        //incident.location = data.location;
        //incident.status = data.status;

        return incident;
      })
    );
  }

  public updateIncident(data: Incident) : Observable<Object>{
    let putObj: IncidentPutDTO = new IncidentPutDTO();
    putObj.description = data.description;
    putObj.incidentDate = data.incidentDate;
    putObj.percentage = null;
    putObj.statusId = data.status.id;
    putObj.locationId = data.location.id;

    return this.http.put<any>(`${this.apiEndpoint}/${data.id}`, putObj);

  }

  public deleteIncident(id: number): Observable<Object> {
    return this.http.delete(`${this.apiEndpoint}/${id}`);
  }

  public getIncident(id: number): Observable<Incident> { // Observable<Incident>

    if(!id) {
      return new Observable<Incident>((subscriber) => {
        subscriber.next(null)
      });
    }

    let output = new Incident();
    

    return new Observable<Incident>(subscriber => {

      this.http.get<IncidentDTO>(`${this.apiEndpoint}/${id}`).subscribe(dto => {

        output.id = dto.incidentId;
        output.description = dto.description;
        output.incidentDate = dto.incidentDate;
        output.percentage = dto.percentage;

        // GET Status
        this._statusService.getIncidentStatus(dto.status).subscribe(statusData => {
          output.status = statusData;

          // GET Location
          this._locationService.getLocation(dto.location).subscribe(locationData => {
            output.location = locationData;


            // GET Staff Member
            this._staffService.getStaffMember(dto.staffId).subscribe(data => {
              output.staff = data;

              subscriber.next(output);
        });
    });
    });
      });
    });

  }

  public getIncidents(): Observable<Incident[]> {

    let output: Incident[] = [];

    return new Observable<Incident[]>(subscriber => {

      this.http.get<IncidentDTO[]>(this.apiEndpoint).subscribe(dtos => {

        dtos.forEach((dto, index, array) => {

          let tmp = new Incident();
          tmp.id = dto.incidentId;
          tmp.description = dto.description;
          tmp.incidentDate = dto.incidentDate;
          tmp.percentage = dto.percentage;
          
          // Get Status for that DTO.
          this._statusService.getIncidentStatus(dto.status).subscribe(statusData => {
            tmp.status = statusData;

            // Then get location.
            this._locationService.getLocation(dto.location).subscribe(locationData => {
              tmp.location = locationData;

              // Then get staff.
              this._staffService.getStaffMember(dto.staffId).subscribe(staffData => {
                tmp.staff = staffData;

                // Finally push this element to the array.
                output.push(tmp);

                // If this is the last element resolve the observer.
                if(index === array.length - 1) {
                  subscriber.next(output);
                }

              });

            });

          });
        });

      });

    });


    // return this.http.get<IncidentDTO[]>(this.apiEndpoint)
    // .pipe(
    //   map((dto) => {
    //     return CreateIncidentsFromDTO(dto);
    //   })
    // );




  }
}
