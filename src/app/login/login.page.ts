import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;
  user: any;
  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }
  
  login() {
    console.log(this.email,this.password);
    this.fireauth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(res => {
        if (res.user) {
          this.user = res.user
          console.log(res.user);
          this.router.navigate([""])

        }
      })
      .catch(err => {
        console.log(`login failed ${err}`);
      });
  }
}
