import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: any;
  calendar: Calendar;

  constructor(private sessionService: SessionService) {
    this.calendar = {} as Calendar;
  }

  ngOnInit(): void {
    this.sessionService.getSession().subscribe((sessions: any) => {
      const events = sessions.map((session: any) => ({
        title: session.intitule,
        start: session.dateSession,
        end: session.dateSession
      }));

      this.calendar = new Calendar(this.calendarComponent.nativeElement, {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        events: events
      });

      this.calendar.render();
    });
  }
}
