import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserData {
  id:number,
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
  title = 'Learning Angular Form';
  
  activePage:string;
  data:UserData[];
  dataToEdit: number;
  constructor(
    private http: HttpClient, 
    @Inject('API_URL') private ApiUrl: string) {
//    this.data = [];
    this.data = [];
    this.activePage = 'browse';
    this.dataToEdit = 0;
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get(this.ApiUrl+'/users')
      .subscribe(
        (users:UserData[]) => { this.data = users }
      );
  }
  navigatePage(page:string) {
    this.activePage = page;
  }
  catchDataToEdit(cathedData:number) {
    this.navigatePage('input');
    this.dataToEdit = cathedData;
  }
  catchDataToDelete(cathedData:UserData) {
    let itemindex = this.data.findIndex(data => data.email === cathedData.email);
    this.data.splice(itemindex,1);
  }
}