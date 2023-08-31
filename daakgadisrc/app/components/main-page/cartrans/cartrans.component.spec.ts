import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartransComponent } from './cartrans.component';

describe('CartransComponent', () => {
  let component: CartransComponent;
  let fixture: ComponentFixture<CartransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartransComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
