import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBookingHistoryComponent } from './manage-booking-history.component';

describe('ManageBookingHistoryComponent', () => {
  let component: ManageBookingHistoryComponent;
  let fixture: ComponentFixture<ManageBookingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBookingHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
