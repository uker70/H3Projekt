import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { IncidentsComponent } from './views/incidents/incidents.component';
import { UsersComponent } from './views/users/users.component';
import { CamerasComponent } from './views/cameras/cameras.component';
import { ProfileComponent } from './views/profile/profile.component';
import { MessagesComponent } from './views/messages/messages.component';
import { LogoutComponent } from './views/logout/logout.component';
import { SettingsComponent } from './settings/settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent } from './ngbd-modal/ngbd-modal.component';
import { ViewIncidentModalComponent } from './views/incidents/view-incident-modal/view-incident-modal.component';
import { EditIncidentModalComponent } from './views/incidents/edit-incident-modal/edit-incident-modal.component';
import { DeleteIncidentModalComponent } from './views/incidents/delete-incident-modal/delete-incident-modal.component';
import { ViewAOBEModalComponent } from './views/cameras/view-aobe-modal/view-aobe-modal.component';
import { EditAOBEModalComponent } from './views/cameras/edit-aobemodal/edit-aobe-modal.component';
import { DeleteAOBEModalComponent } from './views/cameras/delete-aobemodal/delete-aobe-modal.component';
import { ViewUserModalComponent } from './views/users/view-user-modal/view-user-modal.component';
import { DeleteUserModalComponent } from './views/users/delete-user-modal/delete-user-modal.component';
import { EditUserModalComponent } from './views/users/edit-user-modal/edit-user-modal.component';
import { AddUserModalComponent } from './views/users/add-user-modal/add-user-modal.component';
import { AddIncidentModalComponent } from './views/incidents/add-incident-modal/add-incident-modal.component';
import { AddAOBEModalComponent } from './views/cameras/add-aobemodal/add-aobemodal.component';
import { UserLevelPipe } from './pipes/user-level/user-level.pipe';
import { ChangePasswordModalComponent } from './views/profile/change-password-modal/change-password-modal.component';
import { DeactivateProfileModalComponent } from './views/profile/deactivate-profile-modal/deactivate-profile-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    IncidentsComponent,
    UsersComponent,
    CamerasComponent,
    ProfileComponent,
    MessagesComponent,
    LogoutComponent,
    SettingsComponent,
    NgbdModalComponent,
    ViewIncidentModalComponent,
    EditIncidentModalComponent,
    DeleteIncidentModalComponent,
    ViewAOBEModalComponent,
    EditAOBEModalComponent,
    DeleteAOBEModalComponent,
    ViewUserModalComponent,
    DeleteUserModalComponent,
    EditUserModalComponent,
    AddUserModalComponent,
    AddIncidentModalComponent,
    AddAOBEModalComponent,
    UserLevelPipe,
    ChangePasswordModalComponent,
    DeactivateProfileModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
