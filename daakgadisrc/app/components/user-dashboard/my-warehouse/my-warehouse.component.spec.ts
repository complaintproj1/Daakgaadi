import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWarehouseComponent } from './my-warehouse.component';

describe('MyWarehouseComponent', () => {
  let component: MyWarehouseComponent;
  let fixture: ComponentFixture<MyWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyWarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
