import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTruckComponent } from './my-truck.component';

describe('MyTruckComponent', () => {
  let component: MyTruckComponent;
  let fixture: ComponentFixture<MyTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTruckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
