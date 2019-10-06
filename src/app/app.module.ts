import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NgCalendarModule } from 'ionic2-calendar';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth'
import { FcmService } from './fcm.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
registerLocaleData(localeRu);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule, 
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    NgCalendarModule ],
  providers: [
    AngularFireAuth,
    FcmService,
    FCM,
    CallNumber,
    StatusBar,
    SplashScreen,
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
