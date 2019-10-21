import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { parse } from 'date-fns';

export interface Event {
  id?: string;
  title: string;
  description: string;
  name: string;
  phone: string;
  startDay?: any;
  startTime: any;
  endTime: any;
  allDay: boolean;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private eventsCollection: AngularFirestoreCollection<Event>;
  private events: Observable<Event[]>;
  public ev: Event[];

  selected: Date;

  constructor(db: AngularFirestore) { 
    this.eventsCollection = db.collection<Event>('events');
    this.events = this.eventsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map( a => {
          let data = a.payload.doc.data();
          data.startTime = data.startTime.toDate();
          data.endTime = data.endTime.toDate();
          const id = a.payload.doc.id;

          return { id, ...data };
        })
      })
    )
  }

  getEvents() {
    return this.events;
  }
  getEventById(id) {
    return this.eventsCollection.doc<Event>(id).valueChanges();
  }

  // createEvent(event) {

  //   const b = (event.startDay.split('-')).concat(event.startTime.split(':'));
  //   const e = event.startDay.split('-').concat(event.endTime.split(':'));
  //   return this.eventsCollection.add({
  //     title: event.title,
  //     description: event.description,
  //     name: event.name,
  //     phone: event.phone,
  //     startTime: new Date(b[0], b[1] - 1, b[2], b[3], b[4]),
  //     endTime: new Date(e[0], e[1] - 1, e[2], e[3], e[4]),
  //     allDay: false,
  //     status: event.status
  //   });
  // }

  createEvent(event) {
    return this.eventsCollection.add({
      title: event.title,
      description: event.description,
      name: event.name,
      phone: event.phone,
      startTime: parse(event.startDay.split("T",1)[0]+'-'+ event.startTime,'yyyy-MM-d-H:mm',new Date()),
      endTime: parse(event.startDay.split("T",1)[0]+'-'+ event.endTime,'yyyy-MM-d-H:mm',new Date()),
      allDay: false,
      status: event.status
    });
  }
  
    updateEvent(newValues) {
        newValues.startTime = parse(newValues.startDay.split("T",1)[0] +'-'+ newValues.startTime,'yyyy-MM-d-H:mm',new Date());
        newValues.endTime = parse(newValues.startDay.split("T",1)[0]+'-'+ newValues.endTime,'yyyy-MM-d-H:mm',new Date());
        newValues.allDay = false;
        return this.eventsCollection.doc(newValues.id).update(newValues);
    }

    destroyEvent(event) {
      return this.eventsCollection.doc(event.id).delete();
    }
}
