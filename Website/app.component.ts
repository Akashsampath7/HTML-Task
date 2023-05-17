import { Component } from '@angular/core';
import { EnrollService } from './service/enroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [EnrollService]
})
export class AppComponent {
  constructor(private enrollService: EnrollService){

  }
  title = 'SubscribeService';
}