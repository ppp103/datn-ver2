import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubjectIoComponent } from './manage-subject-io.component';

describe('ManageSubjectIoComponent', () => {
  let component: ManageSubjectIoComponent;
  let fixture: ComponentFixture<ManageSubjectIoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSubjectIoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageSubjectIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
