import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsBySubjectComponent } from './questions-by-subject.component';

describe('QuestionsBySubjectComponent', () => {
  let component: QuestionsBySubjectComponent;
  let fixture: ComponentFixture<QuestionsBySubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionsBySubjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionsBySubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
