import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackerinvoiceComponent } from './packerinvoice.component';

describe('PackerinvoiceComponent', () => {
  let component: PackerinvoiceComponent;
  let fixture: ComponentFixture<PackerinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackerinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackerinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
