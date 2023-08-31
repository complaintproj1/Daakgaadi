import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBikeComponent } from './my-bike.component';

describe('MyBikeComponent', () => {
  let component: MyBikeComponent;
  let fixture: ComponentFixture<MyBikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
