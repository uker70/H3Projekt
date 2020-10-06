import { Incident } from '../../models/incident/incident.model';
import { IncidentStatus } from '../../models/incident-status/incident-status.model';
import { Location } from '../../models/location/location.model';
import { Staff } from 'src/app/models/staff/staff.model';
import { Image } from '../../models/image/image.model';

export class IncidentDTO {
    incidentId: number;
    description: string;
    incidentDate: string;
    percentage: number;

    location: number; // Location ID.
    imgId: number; // Image ID
    status: number; // Status ID
    staffId: number; // Staff ID

}

export class IncidentPostDTO {
    description: string;
    incidentDate: string;
    percentage: Object;
    img: string;
    areaName: string;
}

export class IncidentPutDTO {
    description: string;
    incidentDate: string;
    percentage: string = '[]';
    statusId: number;
    locationId: number;
}

export class IncidentPostResponseDTO {
    id: number;
    description: string;
    incidentDate: string;
    percentage: Object;
    img: string;
    location: any;
    status: any;
    areaName: string;
    aobeName: string;
}

function createIncidentFromDTO(input: IncidentDTO): Incident {

    let out = new Incident();

    // Need to instantiate the sub-object here.
    // Will only assign the ID then fetch it later by calling IncidentStatus Service.
    let status = new IncidentStatus();
    status.id = input.status;
    out.status = status;

    // Need to instantiate the sub-object here.
    // Will only assign the ID then fetch it later by calling Location Service.
    let location = new Location();
    location.id = input.location;
    out.location = location;

    // Need to instantiate the sub-object here.
    // Will only assign the ID then fetch it later by calling Staff Service.
    let staff = new Staff();
    staff.id = input.staffId;
    out.staff = staff;

    // Need to instantiate the sub-object here.
    // Will only assign the ID then fetch it later by calling Image Service.
    // let image = new Image();
    // image
    // image.id = input.imgId;
    // out.image = image;
    

    //status.name = input.statusName;

    out.id = input.incidentId;
    out.description = input.description;
    out.incidentDate = input.incidentDate;
    out.percentage = input.percentage;
    

    return out;
}

function createIncidentsFromDTO(input: IncidentDTO[]): Incident[] {
    let output: Incident[] = [];

    input.forEach((value) => {
        output.push(createIncidentFromDTO(value));
    });

    return output;
}

function createDTOFromIncident(input: Incident): IncidentDTO {
    let out = new IncidentDTO();

    out.incidentId = input.id;
    out.description = input.description;
    //out.statusName = input.status.name;
    //incidentDate
    //percentage
    //img
    //ip
    //areaName
    //aobeName
    return out;
}

function createDTOFromIncidents(input: Incident[]): IncidentDTO[] {
    let output: IncidentDTO[] = [];

    input.forEach((value) => {
        output.push(this.createDTOFromIncident(value));
    });

    return output;
}

export {
    createDTOFromIncident as CreateDTOFromIncident,
    createDTOFromIncidents as CreateDTOFromIncidents,
    createIncidentsFromDTO as CreateIncidentsFromDTO,
    createIncidentFromDTO as CreateIncidentFromDTO
};