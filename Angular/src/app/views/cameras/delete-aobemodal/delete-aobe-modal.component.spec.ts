import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAOBEModalComponent } from './delete-aobe-modal.component';

describe('DeleteAOBEModalComponent', () => {
  let component: DeleteAOBEModalComponent;
  let fixture: ComponentFixture<DeleteAOBEModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAOBEModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAOBEModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
