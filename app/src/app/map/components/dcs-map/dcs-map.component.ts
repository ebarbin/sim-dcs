import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
import { MarkerDetailDialogComponent } from 'src/app/app-material/components/marker-detail-dialog/marker-detail-dialog.component';
import { PositionsService } from 'src/app/services/positions.service';

@Component({
  selector: 'app-dcs-map',
  templateUrl: './dcs-map.component.html',
  styleUrls: ['./dcs-map.component.css']
})
export class DcsMapComponent implements OnInit {

  @Input() map;
  @Input() hideLabel;
  @Input() showDetail;
  
  subs: Subscription;
  
  zoom = 9;
  streetViewControl = false;
  fullscreenControl = true;
  mapTypeControl = true;

  positions = [];

  constructor(private matDialog:MatDialog, private positionsService: PositionsService) {}

  ngOnInit() {
    this.subs = interval(5000).subscribe((func => {
      this.positionsService.getPositions().subscribe((positions:any) => {
        this.positions = positions;
      });
    }));
  }

  markerClick(marker) {
    this.matDialog.open(MarkerDetailDialogComponent, {data: marker});
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
