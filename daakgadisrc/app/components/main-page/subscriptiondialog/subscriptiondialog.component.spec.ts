import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptiondialogComponent } from './subscriptiondialog.component';

describe('SubscriptiondialogComponent', () => {
  let component: SubscriptiondialogComponent;
  let fixture: ComponentFixture<SubscriptiondialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptiondialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptiondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
