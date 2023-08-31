import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiketransComponent } from './biketrans.component';

describe('BiketransComponent', () => {
  let component: BiketransComponent;
  let fixture: ComponentFixture<BiketransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiketransComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiketransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
