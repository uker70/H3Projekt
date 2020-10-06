import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faTrash, faBan } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user.model';
import { Staff } from 'src/app/models/staff/staff.model';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent implements OnInit {

  closeResult: string = '';
  confirmation: string = '';
  readonly confirmationString = 'SLET';

  @Input() staff: Staff = null;
  @Output() deleteRequested = new EventEmitter<Staff>();

  faTrash = faTrash;
  faBan = faBan;

  constructor(
    private _userService: UserService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }
  
  isConfirmed(): boolean {
    return this.confirmation === this.confirmationString;
  }

  handleConfirmationKeyup(event: any) {
    this.confirmation = event.target.value.toUpperCase();

    if(event.key === 'Enter' && this.isConfirmed()) {
      this.deleteAction();
    }

  }

  deleteAction() {
    console.log(`Modal triggered Delete Event for Staff with id: ${this.staff.id}`);
    this.deleteRequested.emit(this.staff);
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



}
