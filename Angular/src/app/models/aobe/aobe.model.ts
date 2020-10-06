// (A)UTOMATISK (O)MRÅDE(B)ESKYTTENDE (E)NHED
import { Location } from '../location/location.model';

export class AOBE {
  id: number; // Autoincrement Primary Key.
  IPAddress: string; // IPAddress.
  location: Location; // What location is this AOBE attached to.
  name: string; // Friendly name of this device.

  /**
   *
   */
  constructor() {
    
    // TODO: idk if this breaks shit.
    this.location = new Location();

  }

}