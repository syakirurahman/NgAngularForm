import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface FilterData {
  email:string,
  first_name:string,
  last_name:string,
  phone_number:string
}

export class FilterService {

  private filter = new Subject<any>();
  constructor() { }

  sendData(filterData: FilterData) {
    this.filter.next(filterData);
  }

  clearData() {
    this.filter.next();
  }

  getData(): Observable<FilterData> {
    return this.filter.asObservable();
  }
}
