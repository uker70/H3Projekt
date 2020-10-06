import { getLocalePluralCase } from '@angular/common';
import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import {
  faPencilAlt,
  faPenAlt,
  faPen,
  faBan,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Incident } from '../../../models/incident/incident.model';
import { IncidentStatus } from '../../../models/incident-status/incident-status.model';
import { IncidentService } from '../../../services/incident/incident.service';
import { IncidentStatusService } from '../../../services/incident-status/incident-status.service';
import { Location } from 'src/app/models/location/location.model';
import { LocationService } from 'src/app/services/location/location.service';





@Component({
  selector: 'app-edit-incident-modal',
  templateUrl: './edit-incident-modal.component.html',
  styleUrls: ['./edit-incident-modal.component.scss'],
})
export class EditIncidentModalComponent implements OnInit {
  closeResult: string = '';

  dataHasBeenLoaded: boolean = false;

  availableIncidentStatuses: IncidentStatus[] = [];
  availableLocations: Location[] = [];

  //@Input() case: Case = null;
  incident: Incident = null;
  @Input() incidentId: number = null;
  @Output() saveChangesRequested = new EventEmitter<Incident>();

  faPencilAlt = faPencilAlt;
  faBan = faBan;
  faSave = faSave;

  constructor(
    private modalService: NgbModal,
    private _caseService: IncidentService,
    private _incidentStatusService: IncidentStatusService,
    private _locationService: LocationService
  ) {}

  saveAction() {
    this.saveChangesRequested.emit(this.incident);

    // Then close the modal.
    this.modalService.dismissAll();
  }

  open(content) {

    //this.case = null;
    this.dataHasBeenLoaded = false;

    this._caseService.getIncident(this.incidentId).subscribe((data) => {
      this.incident = data;
      this.dataHasBeenLoaded = true;
    });
    

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    
    this._incidentStatusService.getIncidentStatuses().subscribe((statuses) => {
      this.availableIncidentStatuses = statuses;
    });

    this._locationService.getLocations().subscribe((locations) => {
      this.availableLocations = locations;
    });

  }
}
