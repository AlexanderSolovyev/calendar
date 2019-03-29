import { Injectable } from '@angular/core';

export interface Event {
  id: string;
  title: string;
  description: string;
  name: string;
  phone: string;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  events: Event[] = [
{
  id: '1',
  title: 'Синявино',
  description: 'Большая елка',
  name: 'Алексей',
  phone: '89117053628',
  startTime: new Date(),
  endTime: new Date(),
  allDay: false
},
{
  id: '2',
  title: 'Мшинская',
  description: '3 березы',
  name: 'Володя',
  phone: '8921848348348',
  startTime: new Date(2019, 2, 24, 6, 52),
  endTime: new Date(2019, 2, 24, 6, 53),
  allDay: false
}
  ];

  constructor() { }

  getEvents() {
    return this.events;
  }

  getEventById(id) {
    return this.events.filter(event => event.id === id);
  }

  createEvent(event) {

    const randomId = Math.random().toString(36).substr(2, 5);
    const b = (event.startDay.split('-')).concat(event.startTime.split(':'));
    const e = event.startDay.split('-').concat(event.endTime.split(':'));
    this.events.push({
      id: randomId,
      title: event.title,
      description: event.description,
      name: event.name,
      phone: event.phone,
      startTime: new Date(b[0], b[1] - 1, b[2], b[3], b[4]),
      endTime: new Date(e[0], e[1] - 1, e[2], e[3], e[4]),
      allDay: event.allDay
    });
  }

  updateEvent(newValues) {
    const eventIndex = this.events.findIndex(event => event.id === newValues.id);
    this.events[eventIndex] = newValues;
  }
}
