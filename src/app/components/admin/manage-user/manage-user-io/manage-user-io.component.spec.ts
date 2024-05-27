import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserIoComponent } from './manage-user-io.component';

describe('ManageUserIoComponent', () => {
  let component: ManageUserIoComponent;
  let fixture: ComponentFixture<ManageUserIoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageUserIoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageUserIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
