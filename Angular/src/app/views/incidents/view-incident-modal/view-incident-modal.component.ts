import { Component, Input, OnInit } from '@angular/core';
import { faEye, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//import { Incident } from '../../models/incident/incident.model';
import { Incident } from '../../../models/incident/incident.model';


@Component({
  selector: 'app-view-incident-modal',
  templateUrl: './view-incident-modal.component.html',
  styleUrls: ['./view-incident-modal.component.scss']
})
export class ViewIncidentModalComponent implements OnInit {

  closeResult: string = '';

  @Input() incident: Incident = null;
  

  faEye = faEye;
  faAngleDoubleLeft = faAngleDoubleLeft;

  constructor(private modalService: NgbModal) { }

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



  ngOnInit(): void {
  }

}
