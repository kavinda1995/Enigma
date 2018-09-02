import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { User } from 'firebase/app';
// import { SharedDataService } from '../../../shared/services/shared-data.service';

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
              private http: HttpClient) { }

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
      console.log(data);
      this.shared.userSecret = data;
    });
  }

}
