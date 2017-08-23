import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')],
  // directives: [ ROUTER_DIRECTIVES ],
  // providers: [StateService,DropBoxService],
})
// @Routes([
//   {path: '/',            component: HomeComponent },
//   {path: '/home',        component: HomeComponent },
//   {path: '/projects',    component: ProjectsComponent },
//   {path: '/*',           component: HomeComponent }
// ])
export class AppCmp {}
