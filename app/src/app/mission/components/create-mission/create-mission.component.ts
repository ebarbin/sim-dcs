import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ScheduleMissionDialogComponent } from 'src/app/app-material/components/schedule-mission-dialog/schedule-mission-dialog.component';
import { MissionsService } from 'src/app/common/services/missions.service';

@Component({
  selector: 'app-create-mission',
  templateUrl: './create-mission.component.html',
  styleUrls: ['./create-mission.component.css']
})
export class CreateMissionComponent implements OnInit {

  mission: FormGroup;

  constructor(
    private matDialog: MatDialog, 
    private router: Router, 
    private missionsService: MissionsService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.mission = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      googleDocsLink: ['', [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]]
    });
  }

  onSubmit() {
    this.missionsService.createMission(this.mission.value).subscribe(data => {
      this.toastr.success('Misión creada');
      this.router.navigate(['home']);
    });
  }

  onSubmitAndPublish() {
    const dialogRef = this.matDialog.open(ScheduleMissionDialogComponent);
    dialogRef.afterClosed().subscribe((date: any) => {
      if (date) {
        const req = {...this.mission.value, date: date, publish: true};
        this.missionsService.createMission(req).subscribe(data => {
          this.toastr.success('Misión creada y publicada');
          this.router.navigate(['home']);
        });
      }
    });
  }

}
