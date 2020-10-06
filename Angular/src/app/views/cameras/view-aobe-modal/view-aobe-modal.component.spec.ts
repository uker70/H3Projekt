import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAOBEModalComponent } from './view-aobe-modal.component';

describe('ViewAOBEModalComponent', () => {
  let component: ViewAOBEModalComponent;
  let fixture: ComponentFixture<ViewAOBEModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAOBEModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAOBEModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
