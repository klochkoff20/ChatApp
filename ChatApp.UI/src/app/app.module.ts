import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from './services/auth-guard.service';
import { AppComponent } from './components/app/app.component';
import { BodyComponent } from './components/body/body.component';
import { ChatComponent } from './components/body/chat/chat.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/body/not-found/not-found.component';
import { DashboardComponent } from './components/body/dashboard/dashboard.component';
import { SetNicknameComponent } from './components/body/chat/set-nickname/set-nickname.component';
import { UpdateRoomComponent } from './components/body/dashboard/update-room/update-room.component';
import { DeleteRoomComponent } from './components/body/dashboard/delete-room/delete-room.component';
import { BotProtectionComponent } from './components/body/dashboard/bot-protection/bot-protection.component';


const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'chat/:name', canActivate: [AuthGuard], component: ChatComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    NotFoundComponent,
    ChatComponent,
    DashboardComponent,
    BotProtectionComponent,
    UpdateRoomComponent,
    DeleteRoomComponent,
    SetNicknameComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    BotProtectionComponent,
    UpdateRoomComponent,
    DeleteRoomComponent,
    SetNicknameComponent

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 
}