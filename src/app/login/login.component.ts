
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  email: string;
  password: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.returnUrl = '/';
    // reset login status
    this.authenticationService.logout();
  }

  setEmail(email) {
    return this.email = email;
  }

  setPassword(password) {
    return this.password = password;
  }

  submit() {

    this.authenticationService.login(this.email, this.password)
      .pipe(first())
      .subscribe(
        data => {
          // data is the encrypted token
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
        });
  }
}
