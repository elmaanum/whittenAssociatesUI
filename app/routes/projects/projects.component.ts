import {Component, OnInit} from '@angular/core';
import {StateService, LayoutDirective, FlexDirective} from '../../services/state.service';
import {DropBoxService} from '../../services/dropbox.service';

@Component({
  selector: 'projects',
  templateUrl: 'app/routes/projects/projects.component.html',
  styleUrls: ['app/routes/projects/projects.component.css'],
  providers: [DropBoxService, FlexDirective ,LayoutDirective]
})
export class ProjectsComponent {
  
  title: string = 'Projects';
  body:  string = 'This is the projects body';
  message: string;

  constructor(private _stateService: StateService, private _dropBoxService: DropBoxService) { }
  
  ngOnInit() {
    this.message = this._stateService.getMessage();
    this._dropBoxService.setThumbnails()
  }

  get dropboxes(){
    return this._dropBoxService.getThumbnails()
  }

  updateMessage(m: string): void {
    this._stateService.setMessage(m);
  }
}