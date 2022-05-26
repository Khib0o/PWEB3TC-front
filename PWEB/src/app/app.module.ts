;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddUserDialog, CreateProjectDialog,  HomeComponent, RemoveUserDialog } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { ContentPageComponent } from './content-page/content-page.component';
import {MatListModule} from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { MatTableModule } from '@angular/material/table';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { UserFileComponent } from './user-file/user-file.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { RegisterComponent } from './register/register.component';
import { SspComponent } from './home-page/ssp/ssp.component';
import { RealisationsComponent } from './home-page/realisations/realisations.component';
import { TaskComponent } from './home-page/task/task.component';
import { FooterComponent } from './home-page/footer/footer.component';
import { ProfileComponent } from './home-page/profile/profile.component';
import { ContentMyPageComponent } from './home-page/content-mypage/content-mypage.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ViewAllFilesComponent } from './view-all-files/view-all-files.component'; 



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ContentPageComponent,
    HomePageComponent,
    SignInComponent,
    UserFileComponent,
    RegisterComponent,
    SspComponent,
    RealisationsComponent,
    TaskComponent,
    FooterComponent,
    ProfileComponent,
    ContentMyPageComponent,
    AddUserDialog,
    RemoveUserDialog,
    CreateProjectDialog,
    ViewAllFilesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
