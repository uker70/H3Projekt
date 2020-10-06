import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIncidentModalComponent } from './delete-incident-modal.component';

describe('DeleteCaseModalComponent', () => {
  let component: DeleteIncidentModalComponent;
  let fixture: ComponentFixture<DeleteIncidentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteIncidentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteIncidentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
