import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private fcm: FCM, public toastController: ToastController) { }

  fcmInitialize(){
    this.fcm.getToken().then(token => {
      console.log(token);
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });

    this.fcm.subscribeToTopic('note');

    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
        this.presentToast();
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Спил сохранен',
      duration: 2000
    });
    toast.present();
  }
}
