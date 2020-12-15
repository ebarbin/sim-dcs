import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { AppMaterialModule } from './app-material/app-material.module';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { SidenavListComponent } from './navigation/components/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './navigation/components/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmOverlays } from "agm-overlays";
import { DcsMapComponent } from './map/components/dcs-map/dcs-map.component';
import { DcsMapMarkerComponent } from './map/components/dcs-map-marker/dcs-map-marker.component';
import { PilotsComponent } from './pilots/pilots.component'
import { TokenInterceptor } from './token.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    SidenavListComponent,
    HeaderComponent,
    DcsMapComponent,
    DcsMapMarkerComponent,
    PilotsComponent
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
    FlexLayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
