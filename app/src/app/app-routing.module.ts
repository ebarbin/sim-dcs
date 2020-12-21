import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { WrapperMapComponent } from './map/components/wrapper-map/wrapper-map.component';
import { PilotsComponent } from './pilots/pilots.component';
import { ProfileComponent } from './profile/components/profile/profile.component';

const routes: Routes = [
  { path: 'home', component: WrapperMapComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'pilots', component: PilotsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
