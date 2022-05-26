import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserFileComponent } from './user-file/user-file.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './home-page/profile/profile.component';
import { ViewAllFilesComponent } from './view-all-files/view-all-files.component';

const routes : Routes = [
  { path: 'functionality', component: HomeComponent},
  { path: 'signIn', component: SignInComponent},
  { path: 'functionality/user-file', component: ViewAllFilesComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent},
  { path: '', component: HomePageComponent}

]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
