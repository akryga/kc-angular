import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiAppComponent } from './activiti-app.component';

describe('ActivitiAppComponent', () => {
  let component: ActivitiAppComponent;
  let fixture: ComponentFixture<ActivitiAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitiAppComponent]
    });
    fixture = TestBed.createComponent(ActivitiAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
