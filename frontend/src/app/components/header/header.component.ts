import { Component, OnInit, Input, EventEmitter, Output, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../store/models/user.model';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() user: User;

  @Output() onLogout = new EventEmitter();
  @Output() oncreatePlaylist = new EventEmitter();
  @Output() onToggleSidenav = new EventEmitter();
  @Output() onToggleTheme = new EventEmitter();

  loggedIn: boolean;

  constructor(private auth: AuthService,
              private router: Router,
              private ngZone: NgZone) { }

  ngOnInit() {
    this.loggedIn = this.auth.getLoggedIn();
  }

  logout() {
    this.auth.removeLoggedIn();
    this.ngZone.run(() => {
      this.router.navigateByUrl('/user/login');
    });
  }

  createPlaylist() {
    this.oncreatePlaylist.emit();
  }

  toggleSidenav() {
    this.onToggleSidenav.emit();
  }

  toggleTheme() {
    this.onToggleTheme.emit();
  }
}
