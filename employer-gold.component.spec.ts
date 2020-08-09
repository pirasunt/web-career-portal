import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerGoldComponent } from './employer-gold.component';

describe('EmployerGoldComponent', () => {
  let component: EmployerGoldComponent;
  let fixture: ComponentFixture<EmployerGoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerGoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerGoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
