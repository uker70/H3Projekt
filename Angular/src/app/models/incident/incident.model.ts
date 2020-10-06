import { Location } from 'src/app/models/location/location.model';
import { Staff } from 'src/app/models/staff/staff.model';
import { IncidentStatus } from '../incident-status/incident-status.model';
import { Image } from 'src/app/models/image/image.model';

export class Incident {
  id: number;
  description: string;
  incidentDate: string;
  percentage: Object; // { } ... in DTO percentage will be a string, unless HttpClientModule can return this properly.
  status: IncidentStatus;
  location: Location;
  staff: Staff;
  image: string;
  // spotted_by_aobe
  // spotted_at_location
  // 

  constructor() {
    this.location = new Location();
  }

}
