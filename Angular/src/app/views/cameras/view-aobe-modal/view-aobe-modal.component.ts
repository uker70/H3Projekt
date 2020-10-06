import { Component, Input, OnInit } from '@angular/core';
import { faAngleDoubleLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AOBE } from 'src/app/models/aobe/aobe.model';

@Component({
  selector: 'app-view-aobe-modal',
  templateUrl: './view-aobe-modal.component.html',
  styleUrls: ['./view-aobe-modal.component.scss']
})
export class ViewAOBEModalComponent implements OnInit {

  closeResult: string = '';


  faEye = faEye;
  faAngleDoubleLeft = faAngleDoubleLeft;

  @Input() aobe: AOBE = null;


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
