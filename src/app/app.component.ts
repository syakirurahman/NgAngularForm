import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Form';
  activePage:string;
  data:Array<any>;
  dataToEdit: {
    email:string,
    first_name:string,
    last_name:string,
    password:string,
    confirm_password:string,
    address:string,
    phone_number:string
  };
  constructor() {
    this.data = [];
    this.activePage = 'browse';
    this.dataToEdit = {
      email : 'syakirurohman@gadd.com',
      first_name : 'Syakir',
      last_name : 'rahmanm',
      password : '123asd.',
      confirm_password : '123asd.',
      address : '123asd.',
      phone_number : '+62298347983'
    }
  }
  navigatePage(page:string) {
    this.activePage = page;
  }
  dataSubmited(data: object[]) {
    this.data.push(data);
  }
}
