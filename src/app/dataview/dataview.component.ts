import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.scss']
})
export class DataviewComponent implements OnInit {
  @Input() data: Array<object[]>;
  dataview:Array<any>;
  constructor() { 

  }

  ngOnInit() {
    this.dataview = this.data;
  }
  editData(email:string) {

  }
  deleteData(email:string) {
    let confirm = window.confirm('Apakah anda yakin ?'); 
    if(confirm == true) {
      if(this.dataview.length!==0) {
        let itemindex = this.dataview.findIndex(data => data.email === email);
        this.dataview.splice(itemindex,1);
        alert('Data telah dihapus!');
      }
    }
  }

}
