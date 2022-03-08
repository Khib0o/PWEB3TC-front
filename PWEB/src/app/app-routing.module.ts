import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HelpComponent } from './help/help.component';
import { ContactComponent } from './contact/contact.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserFileComponent } from './user-file/user-file.component';

const routes : Routes = [
  { path: 'functionality', component: HomeComponent},
  { path: 'help', component: HelpComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'signIn', component: SignInComponent},
  { path: 'functionality/user-file', component: UserFileComponent},
  { path: '', component: HomePageComponent}

]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
