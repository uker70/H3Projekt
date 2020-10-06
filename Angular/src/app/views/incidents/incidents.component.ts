import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident/incident.service';
import { Incident } from '../../models/incident/incident.model';
import { faFilter, faTrash, faPencilAlt, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {

  faFilter = faFilter;
  faTrash = faTrash;
  faPencilAlt = faPencilAlt;
  faEye = faEye;
  faPlus = faPlus;

  incidents: Incident[] = [];

  constructor(private _incidentService: IncidentService) { 

  }

  public handleCreateModal(data: Incident) { // Opret Ny ==> Opret
    
    this._incidentService.createIncident(data).subscribe(savedData => {
      this.incidents.push(savedData);
    });

  }

  public handleSaveModal(data: Incident) { // Rediger ==> Gem Ændringer.

    this._incidentService.updateIncident(data).subscribe(updatedData => {
      
      // Dirty fix for now reload the table.
      // Don't have time to implement DeepCopy interface.
      this._incidentService.getIncidents().subscribe(incidents => {
        this.incidents = incidents;
      });

    });
    
  }



  public handleDeleteModal(data: Incident) {
    // Forward the request to the API.
    this._incidentService.deleteIncident(data.id).subscribe( (value) => {
      // Delete it from the local case list here also.
      this.incidents = this.incidents.filter((value, index, arr) => {
        return value.id !==  data.id;
      });

    });
  }

  ngOnInit(): void {
    this._incidentService.getIncidents().subscribe((incidents) => {
      this.incidents = incidents;
    });
  }

}
