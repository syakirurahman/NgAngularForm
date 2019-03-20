import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.scss']
})
export class DataviewComponent implements OnInit {
  @Input() data: Array<object[]>;
  @Output() onEditClicked: EventEmitter<object[]>;
  @Output() onDeleteClicked: EventEmitter<object[]>;
  deletedMessage:boolean;
  constructor() { 
    this.onEditClicked = new EventEmitter();
    this.onDeleteClicked = new EventEmitter();
    this.deletedMessage = false;
  }

  ngOnInit() {
  }
  editData(user:object[]) {
    this.onEditClicked.emit(user);
  }
  deleteData(user:object[]) {
    let confirm = window.confirm('Apakah anda yakin ?'); 
    if(confirm == true) {
      this.onDeleteClicked.emit(user);
      this.deletedMessage = true;
    }
  }

}
