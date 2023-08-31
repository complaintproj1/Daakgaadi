import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarinvoiceComponent } from './carinvoice.component';

describe('CarinvoiceComponent', () => {
  let component: CarinvoiceComponent;
  let fixture: ComponentFixture<CarinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
