import { Component, OnInit } from '@angular/core';

import { EnrollService } from '../service/enroll.service';

@Component({
  selector: 'app-javascript',
  templateUrl: './javascript.component.html',
  styleUrls: ['./javascript.component.less'],
  providers: [EnrollService]
})
export class JavascriptComponent{
  GOT = "Game Of Thrones";
  BrBa = "Breaking Bad";

  constructor(private enrollService: EnrollService){

  }

  OnEnrollGot(){
    this.enrollService.OnEnrollClicked(this.GOT);
  }

  OnEnrollBrBa(){
    this.enrollService.OnEnrollClicked(this.BrBa);
  }
}