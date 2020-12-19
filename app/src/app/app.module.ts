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
import { AssetsPipe } from './common/pipes/assets.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from './common/components/icon/icon.component';
import { ProfileComponent } from './profile/profile.component';
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
    AssetsPipe,
    IconComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyD_jnKh1nBBdRYdNm85eJ652DuF1AErb20'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
    AgmOverlays,
    FlexLayoutModule,
    FontAwesomeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
