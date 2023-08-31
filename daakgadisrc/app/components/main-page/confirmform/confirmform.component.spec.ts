import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmformComponent } from './confirmform.component';

describe('ConfirmformComponent', () => {
  let component: ConfirmformComponent;
  let fixture: ComponentFixture<ConfirmformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
