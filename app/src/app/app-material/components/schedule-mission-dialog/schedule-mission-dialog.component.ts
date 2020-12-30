import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MissionsService } from 'src/app/common/services/missions.service';

@Component({
  selector: 'app-schedule-mission-dialog',
  templateUrl: './schedule-mission-dialog.component.html',
  styleUrls: ['./schedule-mission-dialog.component.css']
})
export class ScheduleMissionDialogComponent implements OnInit {

  todayDate = new Date();
  selectedDate;

  constructor(
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ScheduleMissionDialogComponent>, 
    private missionService: MissionsService) {}

  ngOnInit(): void {}

  onAccept() {

    this.missionService.checkDate(this.selectedDate).subscribe((res: any) => {
      if (res.available) {
        this.dialogRef.close(this.selectedDate);
      } else {
        this.toastr.error('Ya existe una misión publicada en la fecha seleccionada. Por favor seleccione otra fecha.');
      }
    });
  }

}
