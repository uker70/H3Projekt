import { AOBE } from '../../models/aobe/aobe.model';
import { Location } from '../../models/location/location.model';

export class AOBEDTO {
    aobeId: number;
    ip: string;
    aobeName: string;
    location: number; // Location ID.
}

export class AOBEPostDTO {
    ip: string;
    locationId: number;
    aobeName: string;
}

export class AOBEPutDTO {
    ip: string;
    locationId: number;
    aobeName: string;
}

export class AOBEPutResponseDTO {
    id: number;
    location: any; // .locationId, .areaName
    ip: string;
    name: string;
    locationId: number;
}

export class AOBEPostResponseDTO {
    id: number;
    location: any; // .locationId, .areaName
    ip: string;
    name: string;
    locationId: number;
}

function createAOBEFromDTO(input: AOBEDTO): AOBE
{

    let out: AOBE = new AOBE();

    out.id = input.aobeId;
    out.IPAddress = input.ip;
    out.name = input.aobeName;
    // TODO: out.location = input.?????
    out.location = new Location();
    out.location.id = input.location;

    return out;
}

function createAOBEsFromDTO(input: AOBEDTO[]): AOBE[] {
    let output: AOBE[] = [];

    input.forEach((value) => {
        output.push(createAOBEFromDTO(value));
    });

    return output;
}

function createDTOFromAOBE(input: AOBE): AOBEDTO
{
    let out: AOBEDTO = new AOBEDTO();

    out.aobeId = input.id;
    out.ip = input.IPAddress;
    out.aobeName = input.name;
    out.location = input.location.id;
    
    return out;
}

function createDTOFromAOBEs(input: AOBE[]): AOBEDTO[] {
    let output: AOBEDTO[] = [];

    input.forEach((value) => {
        output.push(createDTOFromAOBE(value));
    });

    return output;
}

export {
    createAOBEFromDTO as CreateAOBEFromDTO,
    createAOBEsFromDTO as CreateAOBEsFromDTO,
    createDTOFromAOBE as CreateDTOFromAOBE,
    createDTOFromAOBEs as CreateDTOFromAOBEs
};