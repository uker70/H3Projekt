import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIncidentModalComponent } from './view-incident-modal.component';

describe('ViewCaseModalComponent', () => {
  let component: ViewIncidentModalComponent;
  let fixture: ComponentFixture<ViewIncidentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIncidentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIncidentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
