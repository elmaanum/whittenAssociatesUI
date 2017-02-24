import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {HomeComponent} from './routes/home/home.component';
import {ProjectsComponent} from './routes/projects/projects.component';
import {StateService} from './services/state.service';

@Component({
  selector: 'app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')],
  directives: [ ROUTER_DIRECTIVES ],
  providers: [StateService],
})
@Routes([
  {path: '/',            component: HomeComponent },
  {path: '/home',        component: HomeComponent },
  {path: '/projects',    component: ProjectsComponent },
  {path: '/*',           component: HomeComponent }
])
export class AppComponent {}
