import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { format } from 'date-fns';
import { Location } from '@angular/common'
@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.page.html',
  styleUrls: ['./update-event.page.scss'],
})
export class UpdateEventPage implements OnInit {

  event_form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public apiservice: ApiService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      res => {
        console.log(res.id);
        this.apiservice.getEventById(res.id).
          subscribe(data => {
            console.log('res ' + data.title);
            //this.event = data;
            //console.log(this.event);
            this.event_form = this.formBuilder.group({
              id: res.id,
              status: new FormControl(data.status),
              title: new FormControl(data.title, Validators.required),
              description: new FormControl(data.description, Validators.required),
              name: new FormControl(data.name, Validators.required),
              phone: new FormControl(data.phone, Validators.required), 
              startDay: new FormControl(format(data.startTime.toDate(), 'yyyy-MM-dd')),
              startTime: new FormControl(format(data.startTime.toDate(), 'HH:mm')),
              endTime: new FormControl(format(data.endTime.toDate(), 'HH:mm'))
 
            });

          });
      }
    )
  }

  goBack() {
    this.location.back();
  }

  ucEvent(event: any) {
    this.apiservice.updateEvent(event);
    this.goBack();
  }

}
