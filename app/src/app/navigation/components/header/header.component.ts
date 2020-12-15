import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/app-material/components/confirm-dialog/confirm-dialog.component';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  
  constructor(private dialog: MatDialog, private sessionService: SessionService) { }

  ngOnInit(): void {}
  
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.sessionService.logout();
    });    
  }
}