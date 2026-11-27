import { Component, signal } from "@angular/core";

interface EventItem {
  id:number;
  title: string;
  seats: number;
  registered: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  events = signal<EventItem[]>([
    {
      id: 1,
      title: 'Конференция IT',
      seats:5,
      registered:2
    },
    {
      id:2,
      title: 'Мастер-класс по JS',
      seats:3,
      registered:0
    }
  ]);

private nextId = 3;

addEvent(title: string) {
  title = title.trim();

  if(!title) return;

  this.events.update(list => [
    ...list,
    {
      id:this.nextId++,
      title: title,
      seats: 5,
      registered: 0
    }
  ]);
}

register(id: number) {
  this.events.update(list =>
    list.map(event => {
      if(event.id === id && event.registered < event.seats) {
        return {
          ...event,
          registered:event.registered+1
        };
      }
      return event;
    })
  );
}
}
