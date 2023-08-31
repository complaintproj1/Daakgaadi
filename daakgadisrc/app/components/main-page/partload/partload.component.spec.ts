import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartloadComponent } from './partload.component';

describe('PartloadComponent', () => {
  let component: PartloadComponent;
  let fixture: ComponentFixture<PartloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
