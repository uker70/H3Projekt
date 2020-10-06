import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faBan, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IncidentStatus } from 'src/app/models/incident-status/incident-status.model';
import { Incident } from 'src/app/models/incident/incident.model';
import { Location } from 'src/app/models/location/location.model';
import { IncidentStatusService } from 'src/app/services/incident-status/incident-status.service';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-add-incident-modal',
  templateUrl: './add-incident-modal.component.html',
  styleUrls: ['./add-incident-modal.component.scss']
})
export class AddIncidentModalComponent implements OnInit {

  closeResult: string = '';
  faPlus = faPlus;
  faBan = faBan;
  faSave = faSave;

  availableIncidentStatuses: IncidentStatus[] = [];
  availableLocations: Location[] = [];

  @Output() createRequested: EventEmitter<Incident> = new EventEmitter<Incident>();
  incident: Incident = new Incident();

  constructor(private modalService: NgbModal,
    private _incidentStatusService: IncidentStatusService,
    private _locationService: LocationService
    ) {
    //this.incident = new Incident();
  }

  ngOnInit(): void {
    this._incidentStatusService.getIncidentStatuses().subscribe((statuses) => {
      this.availableIncidentStatuses = statuses;
    });

    this._locationService.getLocations().subscribe((locations) => {
      this.availableLocations = locations;
    });

  }

  createAction() {
    this.createRequested.emit(this.incident);
    this.modalService.dismissAll();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

}
