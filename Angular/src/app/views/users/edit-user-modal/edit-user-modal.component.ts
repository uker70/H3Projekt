import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faBan, faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Staff } from 'src/app/models/staff/staff.model';


@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {

  faBan = faBan;
  faSave = faSave;

  closeResult: string = '';

  @Input() staff: Staff = null;
  @Output() saveRequested: EventEmitter<Staff> = new EventEmitter<Staff>();

  confirmation: string = '';
  readonly confirmationString: string = 'SLET';

  isConfirmed(): boolean {
    return this.confirmation === this.confirmationString;
  }

  handleConfirmationKeyup(event: any) {
    this.confirmation = event.target.value;

    if(event.key === 'Enter' && this.isConfirmed()) {
      this.saveAction();
    }
  }

  saveAction() {
    this.saveRequested.emit(this.staff);
    this.modalService.dismissAll();
  }

  faPencilAlt = faPencilAlt;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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

}
