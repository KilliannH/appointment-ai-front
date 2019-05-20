import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from '../../../credentials';
import {User} from '../models/User';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  appTitle = config.appTitle;
  currUser: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authservice: AuthenticationService,
              private router: Router) {}

  ngOnInit(): void {
    this.authservice.currentUser.subscribe((res) => {
      if (res) {
        this.currUser = res.user;
      }
    });
  }

  logout() {
    this.currUser = null;
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
}
