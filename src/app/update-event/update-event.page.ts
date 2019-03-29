import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.page.html',
  styleUrls: ['./update-event.page.scss'],
})
export class UpdateEventPage implements OnInit {

  event: any;
  edit_event_form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public apiservice: ApiService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      data => {
        this.event = this.apiservice.getEventById(data.id)[0];
        if (!this.event) {
          this.goBack();
        } else {
          this.edit_event_form = this.formBuilder.group({
            title: new FormControl(this.event.title, Validators.required),
            description: new FormControl(this.event.description, Validators.required),
            name: new FormControl(this.event.name, Validators.required),
            phone: new FormControl(this.event.phone, Validators.required),
            startDay: new FormControl(this.event.startDay),
            startTime: new FormControl(this.event.startTime),
            endTime: new FormControl(this.event.endTime)

          });
        }
      });
  }

  goBack () {
    this.router.navigate(['/home']);
  }

  updateEvent(event) {
    this.apiservice.updateEvent(event);
    this.goBack();
  }

}
