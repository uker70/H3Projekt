import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CamerasComponent } from './views/cameras/cameras.component';
import { IncidentsComponent } from './views/incidents/incidents.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LogoutComponent } from './views/logout/logout.component';
import { MessagesComponent } from './views/messages/messages.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './views/users/users.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'incidents', component: IncidentsComponent },
  { path: 'cameras', component: CamerasComponent },
  { path: 'users', component: UsersComponent },
  { path: 'logout', component: LogoutComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'messages', component: MessagesComponent },
  { path: 'settings', component: SettingsComponent },
  { 
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
