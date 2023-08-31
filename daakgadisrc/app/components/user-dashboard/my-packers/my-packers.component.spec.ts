import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPackersComponent } from './my-packers.component';

describe('MyPackersComponent', () => {
  let component: MyPackersComponent;
  let fixture: ComponentFixture<MyPackersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPackersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPackersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
