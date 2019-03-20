import { Component } from '@angular/core';

const dummy = {
  email : 'syakirurohman@gadd.com',
  first_name : 'Syakir',
  last_name : 'rahmanm',
  password : '123asd.',
  confirm_password : '123asd.',
  address : '123asd.',
  phone_number : '+62298347983'
}

interface UserData {
  email:string,
  first_name:string,
  last_name:string,
  password:string,
  confirm_password:string,
  address:string,
  phone_number:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Form';
  
  activePage:string;
  data:Array<any>;
  dataToEdit: UserData;
  constructor() {
//    this.data = [];
    this.data = [dummy];
    this.activePage = 'browse';
    this.dataToEdit = null;
  }
  navigatePage(page:string) {
    this.activePage = page;
  }
  catchDataToEdit(cathedData:UserData) {
    this.navigatePage('input');
    this.dataToEdit = cathedData;
  }
  catchDataToDelete(cathedData:UserData) {
    let itemindex = this.data.findIndex(data => data.email === cathedData.email);
    this.data.splice(itemindex,1);
  }
  addData(dataSent: UserData) {
    this.data.push(dataSent);
  }
  modifyData(dataSent: UserData) {
    let itemindex = this.data.findIndex(data => data.email === dataSent.email);
    this.data[itemindex] = dataSent;
  }
}