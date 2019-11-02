import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { Location } from "@angular/common";

@Component({
  selector: 'app-add-event',
  templateUrl: '../update-event/update-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  event_form: FormGroup;
  constructor(
    public apiService: ApiService,
    public formBuilder: FormBuilder,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.event_form = this.formBuilder.group({
      status: new FormControl('work', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      startDay: new FormControl(format(this.apiService.selected, 'yyyy-MM-dd')),
      startTime: new FormControl('09:00'),
      endTime: new FormControl('12:00')
    });
  }
  ucEvent(event) {
    this.apiService.createEvent(event);
    this.event_form.reset();
    this.goBack();
  }

  goBack() {
    this.location.back();
  }


}

