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
import { MatExpansionModule } from '@angular/material/expansion';
import { MarkerDetailDialogComponent } from './components/marker-detail-dialog/marker-detail-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ScheduleMissionDialogComponent } from './components/schedule-mission-dialog/schedule-mission-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@NgModule({
  declarations: [
    MarkerDetailDialogComponent,
    ConfirmDialogComponent,
    ScheduleMissionDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
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
    MatTableModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSlideToggleModule
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
    MatTableModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSlideToggleModule
  ],
  entryComponents: [
    ConfirmDialogComponent,
    MarkerDetailDialogComponent,
    ScheduleMissionDialogComponent
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }]
})
export class AppMaterialModule { }
