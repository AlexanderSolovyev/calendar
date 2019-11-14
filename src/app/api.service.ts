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
  price: string;
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
    this.getEvents().subscribe(res => {
      this.ev = res;
      console.log(this.ev);
    })
  }
 

  getEvents() {
    return this.events;
  }
  getEventById(id) {
    return this.eventsCollection.doc<Event>(id).valueChanges();
  }

  createEvent(event) {
    return this.eventsCollection.add({
      title: event.title,
      description: event.description,
      name: event.name,
      phone: event.phone,
      startTime: parse(event.startDay.split("T",1)[0]+'-'+ event.startTime,'yyyy-MM-d-H:mm',new Date()),
      endTime: parse(event.startDay.split("T",1)[0]+'-'+ event.endTime,'yyyy-MM-d-H:mm',new Date()),
      allDay: false,
      status: event.status,
      price: event.price
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
