import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncidentModalComponent } from './add-incident-modal.component';

describe('AddIncidentModalComponent', () => {
  let component: AddIncidentModalComponent;
  let fixture: ComponentFixture<AddIncidentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIncidentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIncidentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
