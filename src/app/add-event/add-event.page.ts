import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  events: any = [{
    location: '',
    description: '',
    name: '',
    phone: '',
    startDate: '',
    endDate: ''

  }];

  constructor() { }

  ngOnInit() {
  }

}
