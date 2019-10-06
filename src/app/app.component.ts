import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FcmService } from './fcm.service';

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  user: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcmService: FcmService,
    private router: Router,
    private fireAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcmService.fcmInitialize();
      this.auth();
    });
  }

  auth() {
    this.fireAuth.auth.onAuthStateChanged(user => {
    if (user) {
      this.user = {
      }
    }
    else {
      this.router.navigate(["/login"]);
    }
  })
}}

