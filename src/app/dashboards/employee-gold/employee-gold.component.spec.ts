import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGoldComponent } from './employee-gold.component';

describe('EmployeeGoldComponent', () => {
  let component: EmployeeGoldComponent;
  let fixture: ComponentFixture<EmployeeGoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeGoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeGoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
