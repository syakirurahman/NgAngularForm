import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl,FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Output() onDataSubmited: EventEmitter<object[]>;
  @Output() onDataEdited: EventEmitter<object[]>;
  @Input() dataToEdit: {
    email:string,
    first_name:string,
    last_name:string,
    password:string,
    confirm_password:string,
    address:string,
    phone_number:string
  };
  inputForm: FormGroup;
  data: object[];
  constructor() {
    this.onDataSubmited = new EventEmitter();
    this.onDataEdited = new EventEmitter();
    this.dataToEdit = null;
    this.inputForm = new FormGroup({
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
    if(this.dataToEdit!==null) {
      this.inputForm.get('email').setValue(this.dataToEdit.email);
      this.inputForm.get('first_name').setValue(this.dataToEdit.first_name);
      this.inputForm.get('last_name').setValue(this.dataToEdit.last_name);
      this.inputForm.get('password').setValue(this.dataToEdit.password);
      this.inputForm.get('confirm_password').setValue(this.dataToEdit.confirm_password);
      this.inputForm.get('address').setValue(this.dataToEdit.address);
      this.inputForm.get('phone_number').setValue(this.dataToEdit.phone_number);
    }
  }

  onSubmit(data:object[]) {
    this.data = data;
    if(this.dataToEdit!==null) {
      this.onDataEdited.emit(data);
      alert('Data berhasil diedit');
    } else {
      this.onDataSubmited.emit(data);
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
    }
    );
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