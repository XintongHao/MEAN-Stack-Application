import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';

import { RouterModule, Routes } from '@angular/router';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule } from '@angular/material';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    data: {title: 'User List'}
  },
  {
    path: 'api',
    component: GoogleLoginComponent,
    data: {title: 'Google Login'}
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {title: 'Google Profile'}
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    GoogleLoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,

    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
