import { Component } from '@angular/core';
import { ApiService, Event } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  eventSource;
  viewTitle;

  isToday: boolean;
  calendar = {
    locale: 'ru-Ru',
      mode: 'month',
      currentDate: new Date(),
      dateFormatter: {
          formatMonthViewDay: function(date: Date) {
              return date.getDate().toString();
          },
          formatMonthViewDayHeader: function(date: Date) {
              return 'MonMH';
          },
          formatMonthViewTitle: function(date: Date) {
              return 'testMT';
          },
          formatWeekViewDayHeader: function(date: Date) {
              return 'MonWH';
          },
          formatWeekViewTitle: function(date: Date) {
              return 'testWT';
          },
          formatWeekViewHourColumn: function(date: Date) {
              return 'testWH';
          },
          formatDayViewHourColumn: function(date: Date) {
              return 'testDH';
          },
          formatDayViewTitle: function(date: Date) {
              return 'testDT';
          }
      }
  };
  events: Event[];
  constructor( public apiService: ApiService,
     private router: Router) {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
      this.events = this.apiService.getEvents();
      this.eventSource = this.events;

  }

  loadEvents() {
      this.eventSource = this.events;
      console.log(this.eventSource);
  }

  onViewTitleChanged(title) {
      this.viewTitle = title;
  }

  onEventSelected(event) {
      console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
      this.router.navigateByUrl(`/update-event/` + event.id);
  }

  changeMode(mode) {
      this.calendar.mode = mode;
  }

  today() {
      this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
      console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChanged(event: Date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
  }

  onRangeChanged(ev) {
      console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date: Date) => {
      const current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
  }
}
