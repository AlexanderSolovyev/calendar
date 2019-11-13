import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService, Event } from '../api.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  @ViewChild(IonContent) content: IonContent

  events: Event[];
  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.events = this.apiService.ev.sort((a, b) => { return a.startTime - b.startTime });
    console.log(this.events);
    this.apiService.getEvents().subscribe(res => {
      this.events = res.sort((a, b) => { return a.startTime - b.startTime });
      this.apiService.ev = res;
      console.log(this.events);
    })
  }
  ionViewWillEnter() {
    this.content.scrollToBottom(0)
  }
}
