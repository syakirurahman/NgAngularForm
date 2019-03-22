import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Learning Angular Form';
  
  activePage:string;
  dataToEdit: number;
  constructor() {
    this.activePage = 'browse';
    this.dataToEdit = 0;
  }

  navigatePage(page:string) {
    this.activePage = page;
    this.dataToEdit = 0;
  }
  catchDataToEdit(cathedData:number) {
    this.navigatePage('input');
    this.dataToEdit = cathedData;
  }
}