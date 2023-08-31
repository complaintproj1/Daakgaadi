import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelinvoiceComponent } from './parcelinvoice.component';

describe('ParcelinvoiceComponent', () => {
  let component: ParcelinvoiceComponent;
  let fixture: ComponentFixture<ParcelinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
