import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAOBEModalComponent } from './edit-aobe-modal.component';

describe('EditAOBEModalComponent', () => {
  let component: EditAOBEModalComponent;
  let fixture: ComponentFixture<EditAOBEModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAOBEModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAOBEModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
