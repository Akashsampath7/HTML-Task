import { Component, OnInit } from '@angular/core';

import { EnrollService } from '../service/enroll.service';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.less'],
  providers: [EnrollService]
})
export class AngularComponent{
  PrisonBreak="Prison Break";
  FamilyMan="The Family Man";
  constructor(private enrollService: EnrollService){

  }

  OnEnrollPB(){
    this.enrollService.OnEnrollClicked(this.PrisonBreak);
    
  }

  OnEnrollTFM(){
    this.enrollService.OnEnrollClicked(this.FamilyMan);
    
  }
}