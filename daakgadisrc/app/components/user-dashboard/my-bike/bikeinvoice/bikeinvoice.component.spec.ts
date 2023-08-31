import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeinvoiceComponent } from './bikeinvoice.component';

describe('BikeinvoiceComponent', () => {
  let component: BikeinvoiceComponent;
  let fixture: ComponentFixture<BikeinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikeinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
