import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { WrapperMapComponent } from './map/components/wrapper-map/wrapper-map.component';
import { CreateMissionComponent } from './mission/components/create-mission/create-mission.component';
import { MyMissionListComponent } from './mission/components/my-mission-list/my-mission-list.component';
import { PilotsComponent } from './pilots/pilots.component';
import { ProfileComponent } from './profile/components/profile/profile.component';

const routes: Routes = [
  { path: 'home', component: WrapperMapComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'pilots', component: PilotsComponent, canActivate: [AuthGuard] },
  { path: 'create-mission', component: CreateMissionComponent, canActivate: [AuthGuard] },
  { path: 'my-mission-list', component: MyMissionListComponent, canActivate: [AuthGuard] },
  
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
