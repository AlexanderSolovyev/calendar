import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { Location } from "@angular/common";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  new_event_form: FormGroup;

  constructor(
    public apiService: ApiService,
    public formBuilder: FormBuilder,
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.new_event_form = this.formBuilder.group({
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
  createEvent(event) {
    this.apiService.createEvent(event);
    this.new_event_form.reset();
    this.goBack();
  }

  goBack() {
    this.location.back();
  }


}

