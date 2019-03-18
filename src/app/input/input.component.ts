import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl,FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Output() onDataSubmited: EventEmitter<object[]>;
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
  constructor(fb: FormBuilder) {
    this.dataToEdit = null; 
    this.onDataSubmited = new EventEmitter();
    if(this.dataToEdit!==null) {
      this.inputForm = fb.group({
        'email': [ this.dataToEdit.email, [Validators.required, Validators.email]],
        'first_name': [ this.dataToEdit.first_name, Validators.required],
        'last_name': [ this.dataToEdit.last_name, Validators.required],
        'password': [ this.dataToEdit.password, [Validators.required, Validators.minLength(6), validateNumber, validateSpecialChar]],
        'confirm_password': [ this.dataToEdit.confirm_password, [Validators.required, confirmPasswordValidator]],
        'address': [ this.dataToEdit.address, Validators.required],
        'phone_number': [ this.dataToEdit.phone_number, [Validators.required, phoneNumberValidator]]
      });  
    } else {
      this.inputForm = fb.group({
        'email': ['', [Validators.required, Validators.email]],
        'first_name': ['', Validators.required],
        'last_name': ['', Validators.required],
        'password': ['', [Validators.required, Validators.minLength(6), validateNumber, validateSpecialChar]],
        'confirm_password': ['', [Validators.required, confirmPasswordValidator]],
        'address': ['', Validators.required],
        'phone_number': ['', [Validators.required, phoneNumberValidator]]
      });  
    }

  }

  ngOnInit() {
  }

  onSubmit(data:object[]) {
    this.data = data;
    this.onDataSubmited.emit(data);
    this.inputForm.reset();
    alert('Data berhasil diinput');
  }
}

function validateNumber(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/\d/)) {
    return {hasNoNumber: true};
  } else {
    return {hasNoNumber: false};
  }
}
function validateSpecialChar(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/[^a-zA-Z0-9]/)) {
    return {hasNoSpecialChar: true};
  } else {
    return {hasNoNumber: false};
  }
}
function confirmPasswordValidator(control: AbstractControl): { [s: string]: boolean } {
/*  let password = control.parent.get('password').value; // get password from our password form control
  let confirmPassword = control.get('confirm_password').value; // get password from our confirmPassword form control
  // compare is the password math
  if (password !== confirmPassword) {
    return { NoPasswordMatch:true };
  } else {
    return { NoPasswordMatch:false };
  }*/
  return { NoPasswordMatch:false };
}
function phoneNumberValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^[+62]/g)) {
    return {isInvalid: true};
  } else {
    return {isInvalid: false};
  }
}
