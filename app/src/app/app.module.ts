import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { AppMaterialModule } from './app-material/app-material.module';
import { WrapperMapComponent } from './map/components/wrapper-map/wrapper-map.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { SidenavListComponent } from './core/components/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmOverlays } from "agm-overlays";
import { DcsMapComponent } from './map/components/dcs-map/dcs-map.component';
import { DcsMapMarkerComponent } from './map/components/dcs-map-marker/dcs-map-marker.component';
import { PilotsComponent } from './pilots/pilots.component';
import { AssetsPathFixPipe } from './common/pipes/assets-path-fix.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './profile/components/profile/profile.component';
import { TruncateTextPipe } from './common/pipes/truncate-text.pipe';
import { MissionEventComponent } from './profile/components/mission-event/mission-event.component';
import { EventToImgPipe } from './common/pipes/event-to-img.pipe';
import { EventTranslatePipe } from './common/pipes/event-translate.pipe';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AircraftToImgPipe } from './common/pipes/aircraft-to-img.pipe';
import { IconPipe } from './common/pipes/icon.pipe';
import { LogbookComponent } from './profile/components/logbook/logbook.component';
import { StatsComponent } from './profile/components/stats/stats.component';
import { SortByPipe } from './common/pipes/sort-by.pipe';
import { BlockUIModule } from 'ng-block-ui';
import { CreateMissionComponent } from './mission/components/create-mission/create-mission.component';
import { CalendarMissionsComponent } from './mission/components/calendar-missions/calendar-missions.component';
import { MyMissionListComponent } from './mission/components/my-mission-list/my-mission-list.component';
import { ToastrModule } from 'ngx-toastr';
import { EditMenuComponent } from './mission/components/edit-menu/edit-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { RefreshButtonComponent } from './common/components/refresh-button/refresh-button.component';
import { SkillListComponent } from './profile/components/skill-list/skill-list.component';
import { SkillComponent } from './profile/components/skill/skill.component';
@NgModule({
  declarations: [
    AppComponent,
    WrapperMapComponent,
    LayoutComponent,
    SidenavListComponent,
    HeaderComponent,
    DcsMapComponent,
    DcsMapMarkerComponent,
    PilotsComponent,
    AssetsPathFixPipe,
    ProfileComponent,
    TruncateTextPipe,
    MissionEventComponent,
    EventToImgPipe,
    EventTranslatePipe,
    AircraftToImgPipe,
    IconPipe,
    LogbookComponent,
    StatsComponent,
    SortByPipe,
    CreateMissionComponent,
    CalendarMissionsComponent,
    MyMissionListComponent,
    EditMenuComponent,
    RefreshButtonComponent,
    SkillListComponent,
    SkillComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyD_jnKh1nBBdRYdNm85eJ652DuF1AErb20'}),
    BlockUIModule.forRoot(),
    ToastrModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
    AgmOverlays,
    FlexLayoutModule,
    FontAwesomeModule,
    MatButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
