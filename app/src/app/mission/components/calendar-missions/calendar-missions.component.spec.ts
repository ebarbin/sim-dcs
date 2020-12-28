import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMissionsComponent } from './calendar-missions.component';

describe('CalendarMissionsComponent', () => {
  let component: CalendarMissionsComponent;
  let fixture: ComponentFixture<CalendarMissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarMissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
