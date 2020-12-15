import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerDetailDialogComponent } from './marker-detail-dialog.component';

describe('MarkerDetailDialogComponent', () => {
  let component: MarkerDetailDialogComponent;
  let fixture: ComponentFixture<MarkerDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
