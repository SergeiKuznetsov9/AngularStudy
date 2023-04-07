import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { BasicComponent } from './components/basic/basic.component';
import { CreateOperatorsComponent } from './components/create-operators/create-operators.component';
import { PipeComponent } from './components/pipe/pipe.component';
import { WhereClientSwipedComponent } from './components/practice/where-client-swiped/where-client-swiped.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BasicComponent,
    CreateOperatorsComponent,
    PipeComponent,
    WhereClientSwipedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
