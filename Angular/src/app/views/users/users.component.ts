import { Component, OnInit } from '@angular/core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { User, UserLevel } from 'src/app/models/user/user.model';
import { Staff } from 'src/app/models/staff/staff.model';
import { StaffService } from '../../services/staff/staff.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  staff: Staff[] = [];

  faFilter = faFilter;

  constructor(private _staffService: StaffService) { }

  ngOnInit(): void {

    this._staffService.getStaff().subscribe((staff) => {
      this.staff = staff;
    });
  }

  handleDeleteModal(event: any) {
    console.log("handleDeleteModal(): Implement me");
  }

  handleSaveModal(event: any) {
    console.log("handleSaveModal(): Implement me...")
    
  }

}
