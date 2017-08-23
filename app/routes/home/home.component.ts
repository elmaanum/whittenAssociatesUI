import {Component, OnInit} from '@angular/core';
import {StateService, LayoutDirective, FlexDirective} from '../../services/state.service';
import {DropBoxService} from '../../services/dropbox.service';

@Component({
  selector: 'home',
  template: require('./home.component.html'),
  providers: [DropBoxService,FlexDirective ,LayoutDirective]
}) 
export class HomeComponent implements OnInit {
  title: string = 'Home Page';
  body:  string = 'This is the about home body';
  message: string;
  dropboxes: string[];

  constructor(private _stateService: StateService, private _dropBoxService: DropBoxService) { }

  ngOnInit() {
    this.message = this._stateService.getMessage();
    // this._dropBoxService.getDropBox().then(result => {
    //     this.dropboxes = result;
    // });
  }

  updateMessage(m: string): void {
    this._stateService.setMessage(m);
  }
}