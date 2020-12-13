import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

import { MarkerDetailDialogComponent } from './componets/marker-detail-dialog/marker-detail-dialog.component';

@NgModule({
  declarations: [
    MarkerDetailDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule
  ],
  exports: [
    MatDialogModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule
  ],
  entryComponents: [
    MarkerDetailDialogComponent
  ]
})
export class AppMaterialModule { }
