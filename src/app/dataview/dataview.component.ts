import { Component, OnInit, EventEmitter, Output, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterService } from './../service/filter.service';
import { Subscription } from 'rxjs';

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

interface FilterData {
  email:string,
  first_name:string,
  last_name:string,
  phone_number:string
}


@Component({
  selector: 'app-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.scss']
})
export class DataviewComponent implements OnInit, OnDestroy {
  @Output() onEditClicked: EventEmitter<number>;
  deletedMessage:boolean;
  data: UserData[];
  filterData: FilterData;
  subscription: Subscription;

  constructor(
    private http: HttpClient, 
    @Inject('API_URL') private ApiUrl: string,
    private filterService: FilterService) {

    this.onEditClicked = new EventEmitter();
    this.deletedMessage = false;

    this.filterData = null;

    this.subscription = this.filterService.getData()
    .subscribe(data => {
      this.filterData = data;
      this.getUsers(data);
    });

  }

  ngOnInit() {
    this.getUsers(this.filterData);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getUsers(filter: FilterData) {
    let url: string;
    let email: string = '';
    let first_name: string = '';
    let last_name: string = '';
    let phone: string = '';
    if(filter!==null) {
      console.log(filter.email);
      if(filter.email!=='') {
        email = 'email_like='+encodeURI(filter.email)+'&';
      }
      if(filter.first_name!=='') {
        first_name = 'first_name_like='+encodeURI(filter.first_name)+'&';
      }
      if(filter.last_name!=='') {
        last_name = 'last_name_like='+encodeURI(filter.last_name)+'&';
      }
      if(filter.phone_number!=='') {
        phone = 'phone_number_like='+encodeURIComponent(filter.phone_number);
      }
      url = this.ApiUrl+'/users?'+email+first_name+last_name+phone;
    } else {
      url = this.ApiUrl+'/users';
    }
    this.http.get(url).subscribe(
      (users:UserData[]) => { 
        this.data = users 
      },  
      error => {
        alert('Gagal memuat data!');
        console.log(error);
      });
  }

  deleteUser(id:number) {
    let confirm = window.confirm('Apakah anda yakin ?'); 
    if(confirm == true) {
      this.http.delete(
        this.ApiUrl+'/users/'+id
      )
      .subscribe( response => {
        console.log(response);
        this.getUsers(this.filterData);
        this.deletedMessage = true;
      },
      error => {
        alert('Data gagal dihapus!');
        console.log(error);
      });
    }
  }

  editUser(user:number) {
    this.onEditClicked.emit(user);
  }
}
