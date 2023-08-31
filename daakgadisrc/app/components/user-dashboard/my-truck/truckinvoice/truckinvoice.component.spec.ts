import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckinvoiceComponent } from './truckinvoice.component';

describe('TruckinvoiceComponent', () => {
  let component: TruckinvoiceComponent;
  let fixture: ComponentFixture<TruckinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
