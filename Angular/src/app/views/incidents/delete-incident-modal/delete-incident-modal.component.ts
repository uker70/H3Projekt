import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { faTrash, faBan } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Incident } from '../../../models/incident/incident.model';

@Component({
  selector: 'app-delete-incident-modal',
  templateUrl: './delete-incident-modal.component.html',
  styleUrls: ['./delete-incident-modal.component.scss']
})
export class DeleteIncidentModalComponent implements OnInit {

  closeResult: string = '';
  readonly confirmationString: string = 'SLET';
  confirmation: string = '';


  @Input() incident: Incident = null;
  @Output() deleteRequested = new EventEmitter<Incident>();

  faTrash = faTrash;
  faBan = faBan;

  constructor(private modalService: NgbModal) { }

  isConfirmed(): boolean {
    return this.confirmation == this.confirmationString;
  }

  handleConfirmationKeyup(event: any) {
    this.confirmation = event.target.value.toUpperCase();
    
    if(event.key === "Enter" && this.isConfirmed()) {
      this.deleteAction();
    }
    
  }

  deleteAction() {
    console.log(`Modal triggered Delete event for incident with id: ${this.incident.id}!`);
    
    this.deleteRequested.emit(this.incident);
    
    // Then close the modal.
    this.modalService.dismissAll();
  }

  open(content) {

    this.confirmation = '';
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
