import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateProfileModalComponent } from './deactivate-profile-modal.component';

describe('DeactivateProfileModalComponent', () => {
  let component: DeactivateProfileModalComponent;
  let fixture: ComponentFixture<DeactivateProfileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivateProfileModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivateProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
