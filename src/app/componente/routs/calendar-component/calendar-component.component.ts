import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-component',
  templateUrl: './calendar-component.component.html',
  styleUrls: ['./calendar-component.component.css']
})
export class CalendarComponentComponent implements OnInit {
  selectedDate: Date | undefined;
  minDate: Date;
  maxDate: Date;
  dateCustomClasses: Array<any>;

  constructor() {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 1, 0, 1); // Minimum date is 1 year ago from now
    this.maxDate = new Date(currentYear + 1, 11, 31); // Maximum date is 1 year ahead from now

    // Custom classes for dates (you can modify or remove this if needed)
    this.dateCustomClasses = [
      { date: new Date(currentYear, 0, 1), classes: 'text-primary' }, // Custom class for New Year's Day
      { date: new Date(currentYear, 11, 25), classes: 'text-danger' } // Custom class for Christmas Day
    ];
  }
  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 1, 0, 1); // Minimum date is 1 year ago from now
    this.maxDate = new Date(currentYear + 1, 11, 31); // Maximum date is 1 year ahead from now
  }
}