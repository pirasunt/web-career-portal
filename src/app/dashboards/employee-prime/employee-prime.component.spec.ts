import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePrimeComponent } from './employee-prime.component';

describe('EmployeePrimeComponent', () => {
  let component: EmployeePrimeComponent;
  let fixture: ComponentFixture<EmployeePrimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePrimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
