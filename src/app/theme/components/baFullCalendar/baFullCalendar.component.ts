import {Component, ViewChild, Input, Output, ElementRef, EventEmitter} from '@angular/core';

import 'fullcalendar/main.min.js';

// import 'style-loader!./baFullCalendar.scss';

@Component({
  selector: 'ba-full-calendar',
  templateUrl: './baFullCalendar.html',
  styleUrls:["./baFullCalendar.scss"]
})
export class BaFullCalendar {

  @Input() baFullCalendarConfiguration:Object;
  @Input() baFullCalendarClass:string;
  @Output() onCalendarReady = new EventEmitter<any>();

  @ViewChild('baFullCalendar') public _selector:ElementRef;

  ngAfterViewInit() {
    let calendar = jQuery(this._selector.nativeElement).fullCalendar(this.baFullCalendarConfiguration);
    this.onCalendarReady.emit(calendar);
  }
}
