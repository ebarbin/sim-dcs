import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/app-material/components/confirm-dialog/confirm-dialog.component';
import { SessionService } from 'src/app/services/session.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
 
  faCoffee = faSignOutAlt;

  constructor(private dialog: MatDialog, private sessionService: SessionService) { }
 
  ngOnInit() {}
 
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
 
  logout() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.sessionService.logout();
    });    
  }

}