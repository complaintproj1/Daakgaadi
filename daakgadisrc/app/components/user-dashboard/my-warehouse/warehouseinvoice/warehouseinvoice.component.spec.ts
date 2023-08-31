import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseinvoiceComponent } from './warehouseinvoice.component';

describe('WarehouseinvoiceComponent', () => {
  let component: WarehouseinvoiceComponent;
  let fixture: ComponentFixture<WarehouseinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
