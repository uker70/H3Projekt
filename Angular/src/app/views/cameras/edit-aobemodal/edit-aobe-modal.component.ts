import { Location } from '../../../models/location/location.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faPencilAlt, faBan, faSave } from '@fortawesome/free-solid-svg-icons';
import { AOBE } from 'src/app/models/aobe/aobe.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AobeService } from 'src/app/services/aobe/aobe.service';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-edit-aobe-modal',
  templateUrl: './edit-aobe-modal.component.html',
  styleUrls: ['./edit-aobe-modal.component.scss']
})
export class EditAOBEModalComponent implements OnInit {

  closeResult: string = '';

  dataHasBeenLoaded: boolean = false;

  availableLocations: Location[];

  faPencilAlt = faPencilAlt;
  faBan = faBan;
  faSave = faSave;

  aobe: AOBE = null;
  @Input() aobeId: number = null;
  @Output() saveChangesRequested = new EventEmitter<AOBE>();

  constructor(
    private modalService: NgbModal,
    private _aobeService: AobeService,
    private _locationService: LocationService
  ) { }

  ngOnInit(): void {
    this._locationService.getLocations().subscribe((locations) => {
      this.availableLocations = locations;
    });
  }

  saveAction() {
    console.log(
      `Modal triggered SaveChanges event for AOBE with id: ${this.aobe.id}`
    );

    this.saveChangesRequested.emit(this.aobe);

    // Then close the modal.
    this.modalService.dismissAll();
  }

  open(content) {

    //this.case = null;
    this.dataHasBeenLoaded = false;

    this._aobeService.getAOBE(this.aobeId).subscribe((data) => {
      this.aobe = data;
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

}
