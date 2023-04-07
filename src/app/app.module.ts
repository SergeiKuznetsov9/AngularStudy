import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BasicPickerComponent } from './components/basic-picker/basic-picker.component';
import { OpenByClickingInputPickerComponent } from './components/open-by-clicking-input-picker/open-by-clicking-input-picker.component';
import {MatIconModule} from '@angular/material/icon';
import { RussianDateComponent } from './components/russian-date/russian-date.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';
/* import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './adapters/dateAdapter'; */
import { DateFormatComponent } from './components/date-format/date-format.component';
import { WithDirectivesComponent } from './components/with-directives/with-directives.component';

import { DateFormatDirective } from './directives/appDateFormat';
import { YearMonthFormatDirective } from './directives/appYearMonthFormat';

const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMMM YYYY',
  },
  display: {
    dateInput: 'DD MMMM YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BasicPickerComponent,
    OpenByClickingInputPickerComponent,
    RussianDateComponent,
    DateFormatComponent,
    WithDirectivesComponent,
    DateFormatDirective,
    YearMonthFormatDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    MatIconModule

  ],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


