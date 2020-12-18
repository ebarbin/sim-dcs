import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { PilotsComponent } from './pilots/pilots.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [] },
  { path: 'pilots', component: PilotsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
