import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Form';
  activePage:string;
  constructor() { 
    this.activePage = 'browse';
  }
  navigatePage(page:string) {
    this.activePage = page;
  }
}
