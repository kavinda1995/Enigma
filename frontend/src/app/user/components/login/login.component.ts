import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedDataService } from '../../../shared/services/shared-data.service';
import { Router } from '@angular/router';
// import { User } from 'firebase/app';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = true;

  user = {
    username: '',
    password: '',
    cpassword: '',
    email: ''
  };

  usernameFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private auth: AuthService,
              private http: HttpClient,
              public shared: SharedDataService,
              private router: Router,
              private ngZone: NgZone) { }

  ngOnInit() {
  }

  signInWithGoogle() {
    this.auth.signInWithGoogle();
  }

  openRegister() {
    this.loginForm = false;
  }

  openLogin() {
    this.loginForm = true;
  }

  login() {
    // login
    const userData = {
      username: this.user.username,
      password: this.user.password
    };

    this.http.post('http://localhost:3000/user/login', userData).subscribe(data => {
      this.shared.setUserSecret(data);
      this.auth.setLoggedIn();
      this.ngZone.run(() => {
        this.router.navigateByUrl('/artists');
      });
      // this.router.navigateByUrl['../../artists'];
      return true;
    }, error => {
      if (error.status === 404) {
        alert('Wrong username or password');
        this.usernameFormControl.reset();
      }
    });
  }

  register() {
    if (this.user.password === this.user.cpassword) {
      const userData = {
        username: this.user.username,
        password: this.user.password,
        email: this.user.email
      };

      this.http.post('http://localhost:3000/user/register', userData).subscribe(data => {
        alert('Registration Completed');
        this.ngZone.run(() => {
          this.router.navigateByUrl('/user');
        });
      }, error => {
        if (error.status !== 200) {
          alert('Error :' + error.toString());
        }else {
          alert('Registration Completed');
          this.ngZone.run(() => {
            this.router.navigateByUrl('/user');
          });
        }
      });

    }else {
      alert('Passwords dont match');
    }
  }


}
