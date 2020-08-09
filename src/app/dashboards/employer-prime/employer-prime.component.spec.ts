import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerPrimeComponent } from './employer-prime.component';

describe('EmployerPrimeComponent', () => {
  let component: EmployerPrimeComponent;
  let fixture: ComponentFixture<EmployerPrimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerPrimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerPrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
