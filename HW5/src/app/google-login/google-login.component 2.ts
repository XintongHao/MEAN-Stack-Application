import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements OnInit {
  data: Object = {};
  constructor(private api: ApiService) { }

  ngOnInit() {
  }
  /*
  *  Go to api.service.ts for details.
  * */
  login(): void {
    this.api.googleLogin();
    // this.api.googleLogin()
    //   .subscribe(res => {
    //     console.log(res);
    //     this.data = res;
    //   }, err => {
    //     console.log(err);
    //   });
  }

}
