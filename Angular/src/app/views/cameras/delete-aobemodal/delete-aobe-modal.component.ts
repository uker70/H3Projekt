import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTrash, faBan } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AOBE } from 'src/app/models/aobe/aobe.model';

@Component({
  selector: 'app-delete-aobe-modal',
  templateUrl: './delete-aobe-modal.component.html',
  styleUrls: ['./delete-aobe-modal.component.scss']
})
export class DeleteAOBEModalComponent implements OnInit {

  faTrash = faTrash;
  faBan = faBan;

  @Input() aobe: AOBE = null;
  @Output() deleteRequested = new EventEmitter<AOBE>();

  closeResult: string = '';
  readonly confirmationString: string = 'SLET';
  confirmation = '';

  constructor(private modalService: NgbModal) { }

  handleConfirmationKeyup(event: any) {
    this.confirmation = event.target.value.toUpperCase();

    if(event.key === "Enter" && this.isConfirmed()) {
      this.deleteAction();
    }
  }

  isConfirmed(): boolean {
    return this.confirmation === this.confirmationString;
  }

  deleteAction() {
    console.log(`Modal triggered Delete event for AOBE with id: ${this.aobe.id}!`);
    this.deleteRequested.emit(this.aobe);
    // Then close the modal.
    this.modalService.dismissAll();
  }

  open(content) {
    this.confirmation = '';

    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    
    switch(reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }

  }

  ngOnInit(): void {
  }

}
