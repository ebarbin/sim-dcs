import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MissionsService } from 'src/app/common/services/missions.service';
import { ConfirmDialogComponent } from 'src/app/app-material/components/confirm-dialog/confirm-dialog.component';
import { ScheduleMissionDialogComponent } from 'src/app/app-material/components/schedule-mission-dialog/schedule-mission-dialog.component';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {

  @Input() element;
  @Output() dataChangedEvent = new EventEmitter();

  constructor(private missionService: MissionsService, private matDialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {}

  onRemove() {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((value: any) => {
      if (value) {
        this.missionService.removeMission(this.element).subscribe(() => {
          this.toastr.success('Misión eliminada');
          this.dataChangedEvent.emit();
        });
      };
    });
  }

  onUnPublish() {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((value: any) => {
      if (value) {
        const req = {...this.element, publish: false, date: null};
        this.missionService.updateMission(req).subscribe(() => {
          this.toastr.success('Misión actualizada');
          this.dataChangedEvent.emit();
        });
      };
    });
  }

  onPublish() {
    const dialogRef = this.matDialog.open(ScheduleMissionDialogComponent);
    dialogRef.afterClosed().subscribe((date: any) => {
      if (date) {
        const req = {...this.element, publish: true, date: date};
        this.missionService.updateMission(req).subscribe(() => {
          this.toastr.success('Misión actualizada');
          this.dataChangedEvent.emit();
        });
      }
    });
  }

  onLink() { window.open(this.element.googleDocsLink); }
}
