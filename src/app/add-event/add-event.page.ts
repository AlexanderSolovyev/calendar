import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  new_event_form: FormGroup;

  constructor(
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.new_event_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      startDay: new FormControl(''),
      startTime: new FormControl(''),
      endTime: new FormControl('')
    });
  }
  createEvent(event) {
    this.apiService.createEvent(event);
    this. new_event_form.reset();
    this.goBack();
  }

  goBack() {
    this.router.navigate(['/home']);
  }


}

