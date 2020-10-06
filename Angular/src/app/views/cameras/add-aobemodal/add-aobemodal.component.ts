import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faBan, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AOBE } from 'src/app/models/aobe/aobe.model';
import { Location } from 'src/app/models/location/location.model';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-add-aobemodal',
  templateUrl: './add-aobemodal.component.html',
  styleUrls: ['./add-aobemodal.component.scss']
})
export class AddAOBEModalComponent implements OnInit {

  closeResult: string = '';

  faEye = faEye;
  faPlus = faPlus;
  faBan = faBan;

  availableLocations: Location[] = null;

  aobe: AOBE = new AOBE();

  @Output() createRequested: EventEmitter<AOBE> = new EventEmitter<AOBE>();

  constructor(private _locationService: LocationService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this._locationService.getLocations().subscribe((locations) => {
      this.availableLocations = locations;
    });
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

  createAction() {
    this.createRequested.emit(this.aobe);
    this.modalService.dismissAll();
  }

}
