import { IncidentStatus } from "../../models/incident-status/incident-status.model";

export class IncidentStatusDTO {
    statusId: number;
    statusName: string;
}

function createIncidentStatusFromDTO(input: IncidentStatusDTO): IncidentStatus {
    let out: IncidentStatus = new IncidentStatus();

    out.id = input.statusId;
    out.name = input.statusName;

    return out;
}

function createIncidentStatusesFromDTO(input: IncidentStatusDTO[]): IncidentStatus[] {
    let output: IncidentStatus[] = [];

    input.forEach((value) => {
        output.push(createIncidentStatusFromDTO(value));
    });

    return output;
}

function createDTOFromIncidentStatus(input: IncidentStatus): IncidentStatusDTO {
    let out: IncidentStatusDTO = new IncidentStatusDTO();

    out.statusId = input.id;
    out.statusName = input.name;

    return out;
}

function createDTOFromIncidentStatuses(input: IncidentStatus[]): IncidentStatusDTO[] {
    let output: IncidentStatusDTO[] = [];

    input.forEach((value) => {
        output.push(createDTOFromIncidentStatus(value));
    });

    return output;
}

export {
    createDTOFromIncidentStatus as CreateDTOFromIncidentStatus,
    createDTOFromIncidentStatuses as CreateDTOFromIncidentStatuses,
    createIncidentStatusFromDTO as CreateIncidentStatusFromDTO,
    createIncidentStatusesFromDTO as CreateIncidentStatusesFromDTO
};