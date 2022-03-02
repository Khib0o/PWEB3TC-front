import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes : Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'accueil', component: HomePageComponent}

]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
