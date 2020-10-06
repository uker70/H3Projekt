import { Component, OnInit } from '@angular/core';
import { Staff } from 'src/app/models/staff/staff.model';
import { StaffService } from 'src/app/services/staff/staff.service';
import { faLock, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  faLock = faLock;
  faMinusCircle = faMinusCircle;

  staffMember: Staff;

  constructor(private _staffService: StaffService) { }

  ngOnInit(): void {
    this._staffService.getStaffMember(environment.fakeAuthenticatedUserId).subscribe((member) => {
      this.staffMember = member;
    });
  }

}
