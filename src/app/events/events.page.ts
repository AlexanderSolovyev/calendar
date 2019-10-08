import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService, Event } from '../api.service';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  @ViewChild(IonContent) content: IonContent
  
  events: Event[];
  constructor(private apiService: ApiService,
    private router: Router,
     private callNumber: CallNumber,
     public alertController: AlertController) { 
    
  }

  ngOnInit() {
    this.events = this.apiService.ev.sort((a,b)=>{return a.startTime-b.startTime});
  console.log(this.events);
  this.apiService.getEvents().subscribe(res => {
    this.events = res.sort((a,b)=>{return a.startTime-b.startTime});
    this.apiService.ev=res;
    console.log(this.events);
})

  }
  ionViewWillEnter() {
    this.content.scrollToBottom(0)
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    this.router.navigateByUrl(`/update-event/` + event.id);
      
}
async onDestroyEvent(event){

  const alert = await this.alertController.create({
      header: 'Э АЛЛО !',
      message: 'Ты уверен что хочешь удалить спил??',
      buttons: [
        {
          text: 'НЕТ!!!',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
              
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Да, нахуй!',
          handler: () => {
              this.apiService.destroyEvent(event);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
     
 }

 onCallEvent(event){
  this.callNumber.callNumber(event.phone, true)
.then(res => console.log('Launched dialer!', res))
.catch(err => console.log('Error launching dialer', err));
 }

}
