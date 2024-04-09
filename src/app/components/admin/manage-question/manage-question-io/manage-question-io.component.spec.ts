import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuestionIoComponent } from './manage-question-io.component';

describe('ManageQuestionIoComponent', () => {
  let component: ManageQuestionIoComponent;
  let fixture: ComponentFixture<ManageQuestionIoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageQuestionIoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageQuestionIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
