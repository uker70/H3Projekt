import { Location } from '../../models/location/location.model';

export class LocationDTO {
    locationId: number;
    areaName: string;
}

function createDTOFromLocation(input: Location): LocationDTO {
    let out = new LocationDTO();

    out.locationId = input.id;
    out.areaName = input.areaName;

    return out;
}

function createDTOFromLocations(input: Location[]): LocationDTO[] {
    let output: LocationDTO[] = [];

    input.forEach((value) => {
        output.push(createDTOFromLocation(value));
    });

    return output;
}

function createLocationFromDTO(input: LocationDTO): Location {
    let out = new Location();

    out.id = input.locationId;
    out.areaName = input.areaName;

    return out;
}

function createLocationsFromDTO(input: LocationDTO[]): Location[] {

    let output: Location[] = [];

    input.forEach((value) => {
        output.push(createLocationFromDTO(value))
    });

    return output;
}

export {
    createLocationFromDTO as CreateLocationFromDTO,
    createLocationsFromDTO as CreateLocationsFromDTO,
    createDTOFromLocation as CreateDTOFromLocation,
    createDTOFromLocations as CreateDTOFromLocations
};
