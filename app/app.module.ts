import 'core-js';
import 'zone.js/dist/zone';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppCmp} from './app/app.component';
import {HomeComponent} from './routes/home/home.component';
import {ProjectsComponent} from './routes/projects/projects.component';

import {StateService} from './services/state.service';
import {DropBoxService} from './services/dropbox.service';

import {RouterModule} from "@angular/router";

// import { ReactiveFormsModule } from '@angular/forms';
// import {HttpModule} from "@angular/http";
// import { MaterialModule} from '@angular/material';

// import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
// import {bootstrap} from '@angular/platform-browser-dynamic';
// import {ROUTER_PROVIDERS} from '@angular/router';


@NgModule({
  imports: [
      BrowserModule,
      // ReactiveFormsModule,
      // HttpModule,
      // MaterialModule.forRoot(),
      RouterModule.forRoot([
        { path: '', redirectTo: '/routes/home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'projects', component: ProjectsComponent },
      ]
      // , {useHash: true}
    ),
  ],
  declarations:[
    AppCmp,
    HomeComponent,
    ProjectsComponent
  ],
  providers: [
      DropBoxService
    ],
  bootstrap: [AppCmp]
})
// bootstrap(AppComponent, [
//   ROUTER_PROVIDERS
// ]);
export class AppModule {}