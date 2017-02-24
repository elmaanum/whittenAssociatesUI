import {Component, OnInit} from '@angular/core';
import {StateService, LayoutDirective, FlexDirective} from '../../services/state.service';
import {DropBoxService} from '../../services/dropbox.service';

@Component({
  selector: 'projects',
  template: require('./projects.component.html'),
  providers: [DropBoxService,FlexDirective ,LayoutDirective]
})
export class ProjectsComponent implements OnInit {
  title: string = 'Projects Page';
  body:  string = 'This is the about projects body';
  message: string;
  dropboxes: string[];

  constructor(private _stateService: StateService, private _dropBoxService: DropBoxService) { }

  ngOnInit() {
    this.message = this._stateService.getMessage();
    this._dropBoxService.getDropBox().then(result => {
        this.dropboxes = result;
    });
  }

  updateMessage(m: string): void {
    this._stateService.setMessage(m);
  }
}