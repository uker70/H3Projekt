import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { AOBE } from 'src/app/models/aobe/aobe.model';
import { AobeService } from '../../services/aobe/aobe.service';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent implements OnInit {

  faFilter = faFilter;

  aobes: AOBE[] = [];

  constructor(private _aobeService: AobeService) {
    
  }

  ngOnInit(): void {
    // Load AOBEs.
    this._aobeService.getAOBEs().subscribe((aobes) => {
      this.aobes = aobes;
    });
  }

  handleCreateModal(event: AOBE) {

    console.log('handleCreateModal(AOBE)... called...');
    console.log(event);
    this._aobeService.createAOBE(event).subscribe(savedData => {

      console.log(savedData);

      // Update Aobe with Saved ID:
      //event.id = savedData.id;

      // Since the AOBE is created, add it to the local list.
      this.aobes.push(savedData);

    });

  }

  handleDeleteModal(event: AOBE) {
    this._aobeService.deleteAOBE(event.id).subscribe(x => {
      // Don't care about the result.
      // Remove the element from local list.
      this.aobes = this.aobes.filter(a => a.id !== event.id);

    });
  }

  handleSaveModal(data: AOBE) {
    console.log('handleSaveModal(): Implement me, Cameras.component.ts');

    console.log(data);

    this._aobeService.updateAOBE(data).subscribe(updatedData => {

      console.log(updatedData);
      
      // Dirty fix, reload the table. Dont have time to implement DeepCopy().
      this._aobeService.getAOBEs().subscribe(aobeData => {
        this.aobes = aobeData;
      });

      

    });

  }

}
