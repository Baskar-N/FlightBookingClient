import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAirlineComponent } from './manage-airline.component';

describe('ManageAirlineComponent', () => {
  let component: ManageAirlineComponent;
  let fixture: ComponentFixture<ManageAirlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAirlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAirlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
