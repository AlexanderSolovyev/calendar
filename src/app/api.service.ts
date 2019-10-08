import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Event {
  id?: string;
  title: string;
  description: string;
  name: string;
  phone: string;
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

  createEvent(event) {

    const b = (event.startDay.split('-')).concat(event.startTime.split(':'));
    const e = event.startDay.split('-').concat(event.endTime.split(':'));
    return this.eventsCollection.add({
      title: event.title,
      description: event.description,
      name: event.name,
      phone: event.phone,
      startTime: new Date(b[0], b[1] - 1, b[2], b[3], b[4]),
      endTime: new Date(e[0], e[1] - 1, e[2], e[3], e[4]),
      allDay: false,
      status: event.status
    });
  }
  
    updateEvent(newValues) {
        const b = (newValues.startDay.split('-')).concat(newValues.startTime.split(':'));
        const e = newValues.startDay.split('-').concat(newValues.endTime.split(':'));
        //const eventIndex = this.events.findIndex(event => event.id === newValues.id);
        newValues.startTime = new Date(b[0], b[1] - 1, b[2], b[3], b[4]);
        newValues.endTime = new Date(e[0], e[1] - 1, e[2], e[3], e[4]);
        newValues.allDay = false;
        return this.eventsCollection.doc(newValues.id).update(newValues);
    }

    destroyEvent(event) {
      return this.eventsCollection.doc(event.id).delete();
    }
}
