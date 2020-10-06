import { Component, Input, OnInit } from '@angular/core';
import { faLock, faLockOpen, faMinus, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Staff } from 'src/app/models/staff/staff.model';

@Component({
  selector: 'app-deactivate-profile-modal',
  templateUrl: './deactivate-profile-modal.component.html',
  styleUrls: ['./deactivate-profile-modal.component.scss']
})
export class DeactivateProfileModalComponent implements OnInit {

  closeResult: string = '';

  readonly confirmationString = 'DEAKTIVER';
  confirmation: string = '';



  showPassword: boolean = false;

  faLock = faLock;
  faLockOpen = faLockOpen;
  faMinusCircle = faMinusCircle;
  //faEye = faEye;

  @Input() user: Staff = null;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  isConfirmed(): boolean {
    return this.confirmation === this.confirmationString;
  }

  handleConfirmationKeyup(event: any) {
    this.confirmation = event.target.value.toUpperCase();

    if(event.key === 'Enter' && this.isConfirmed()) {
      this.deactivateAction();
      this.modalService.dismissAll();
    }


  }

  deactivateAction() {
    console.log(`Deactivate staff with id: ${this.user.id}`);
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
