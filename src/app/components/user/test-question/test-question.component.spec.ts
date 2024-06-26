import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestQuestionComponent } from './test-question.component';

describe('TestQuestionComponent', () => {
  let component: TestQuestionComponent;
  let fixture: ComponentFixture<TestQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
