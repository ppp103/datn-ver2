import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultPreviewComponent } from './test-result-preview.component';

describe('TestResultPreviewComponent', () => {
  let component: TestResultPreviewComponent;
  let fixture: ComponentFixture<TestResultPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestResultPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestResultPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
