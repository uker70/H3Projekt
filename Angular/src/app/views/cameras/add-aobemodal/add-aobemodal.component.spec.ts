import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAOBEModalComponent } from './add-aobemodal.component';

describe('AddAOBEModalComponent', () => {
  let component: AddAOBEModalComponent;
  let fixture: ComponentFixture<AddAOBEModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAOBEModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAOBEModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
