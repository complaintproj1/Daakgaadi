import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookpackerComponent } from './bookpacker.component';

describe('BookpackerComponent', () => {
  let component: BookpackerComponent;
  let fixture: ComponentFixture<BookpackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookpackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookpackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
