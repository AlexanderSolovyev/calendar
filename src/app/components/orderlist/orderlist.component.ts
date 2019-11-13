import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss'],
})
export class OrderlistComponent implements OnInit {
  @Input() public event;

  constructor(
    private router: Router,
    private callNumber: CallNumber,
    public alertController: AlertController,
    public apiService: ApiService
  ) { }

  ngOnInit() { }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    this.router.navigateByUrl(`/update-event/` + event.id);

  }

  async onDestroyEvent(event) {

    const alert = await this.alertController.create({
      header: 'Внимание !',
      message: 'Ты уверен что хочешь удалить ??',
      buttons: [
        {
          text: 'НЕТ',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Да',
          handler: () => {
            this.apiService.destroyEvent(event);
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  onCallEvent(event) {
    this.callNumber.callNumber(event.phone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

}
