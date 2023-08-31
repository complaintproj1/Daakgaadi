import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyParcelComponent } from './my-parcel.component';

describe('MyParcelComponent', () => {
  let component: MyParcelComponent;
  let fixture: ComponentFixture<MyParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyParcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
