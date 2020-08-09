import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBasicComponent } from './employee-basic.component';

describe('EmployeeBasicComponent', () => {
  let component: EmployeeBasicComponent;
  let fixture: ComponentFixture<EmployeeBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
