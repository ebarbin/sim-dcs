import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-marker-detail-dialog',
  templateUrl: './marker-detail-dialog.component.html',
  styleUrls: ['./marker-detail-dialog.component.css']
})
export class MarkerDetailDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
   }

  ngOnInit(): void {
  }

}
