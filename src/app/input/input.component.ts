import { Component, OnInit, EventEmitter, Input, Output, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() dataToEdit: number;
  inputForm: FormGroup;
  data: UserData[];
  constructor(
    private http: HttpClient,
    @Inject('API_URL') private ApiUrl: string
    ) {
    this.dataToEdit = 0;
    this.inputForm = new FormGroup({
//      'id':new FormControl(this.dataToEdit),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'first_name': new FormControl('', Validators.required),
      'last_name': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required, Validators.minLength(6), validateNumber, validateSpecialChar]),
      'confirm_password': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'phone_number': new FormControl('', [Validators.required, phoneNumberValidator])
    }, confirmPasswordValidator);
  }

  ngOnInit() {  
    if(this.dataToEdit!==0) {
      this.getUser(this.dataToEdit);
    }
  }

  getUser(id:number) {
    this.http.get(this.ApiUrl+'/users/'+id)
    .subscribe((User:UserData) => {
      this.inputForm.get('email').setValue(User.email);
      this.inputForm.get('first_name').setValue(User.first_name);
      this.inputForm.get('last_name').setValue(User.last_name);
      this.inputForm.get('password').setValue(User.password);
      this.inputForm.get('confirm_password').setValue(User.confirm_password);
      this.inputForm.get('address').setValue(User.address);
      this.inputForm.get('phone_number').setValue(User.phone_number);
    });
  }

  updateUser(id:number, user:UserData) {
    this.http.put(
      this.ApiUrl+'/users/'+id,
      user
    )
    .subscribe( response => {
      console.log(response);
    });
  }

  onSubmit(data:UserData) {
    console.log(data)
    if(this.dataToEdit!==0) {
      this.updateUser(this.dataToEdit,data);
      alert('Data berhasil diedit');
    } else {
      alert('Data berhasil diinput');
    }
//    this.inputForm.reset();
    this.inputForm.reset({
      email:'',
      first_name:'',
      last_name:'',
      password:'',
      confirm_password:'',
      address:'',
      phone_number:''
    });
  }
}

function validateNumber(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/\d/)) {
    return {hasNoNumber: true};
  } else {
    return {};
  }
}
function validateSpecialChar(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/[^a-zA-Z0-9]/)) {
    return {hasNoSpecialChar: true};
  } else {
    return {};
  }
}

function confirmPasswordValidator(form: FormGroup): { [s: string]: boolean } {

  let password = form.get('password').value;
  let confirmPassword = form.get('confirm_password').value;
  if (password !== confirmPassword) {
    form.get('confirm_password').setErrors({isPasswordMismatch:true});
  }
/*  if (confirmPassword==='') {
    form.get('confirm_password').setErrors({required:true});
  }*/
  return {};
}

function phoneNumberValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^[+62]/g)) {
    return {isInvalid: true};
  } else {
    return {};
  }
}