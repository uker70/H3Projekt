import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/services/incident/incident.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _incidentService: IncidentService
  ) { }

  ngOnInit(): void {
  }

  testerMethod() {
    //this._incidentService.getIncident(1);

    // this._incidentService.getIncident(1).subscribe(x => {
    //   console.log(x);
    // });

    this._incidentService.getIncidents().subscribe(x => {
      console.log(x);
    });


  }

}
