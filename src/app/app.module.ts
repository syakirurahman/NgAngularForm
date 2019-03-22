import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { DataviewComponent } from './dataview/dataview.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from './filter/filter.component';
import { FilterService } from './service/filter.service';
@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    DataviewComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: 'API_URL', useValue: 'http://localhost:3000' },
    FilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
