import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { FilterService } from './../service/filter.service';

interface filterData {
  email:string,
  first_name:string,
  last_name:string,
  phone_number:string
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;
  email: AbstractControl;
  first_name: AbstractControl;
  last_name: AbstractControl;
  phone_number: AbstractControl;

  constructor(private filterService: FilterService) { 
    this.filterForm = new FormGroup({
      'email': new FormControl(''),
      'first_name': new FormControl(''),
      'last_name': new FormControl(''),
      'phone_number': new FormControl('')
    });
    this.email = this.filterForm.controls['email'];
    this.first_name = this.filterForm.controls['first_name'];
    this.last_name = this.filterForm.controls['last_name'];
    this.phone_number = this.filterForm.controls['phone_number'];
  }

  ngOnInit() {

  }

  onSubmit(data: filterData) {
    this.filterService.sendData(data);
  }

}
