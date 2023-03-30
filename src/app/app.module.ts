import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { MaterialUIModule } from './modules/material-ui.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { AboutNavigationComponent } from './components/contentComponents/about-navigation/about-navigation.component';
import { AboutTemplateComponent } from './components/contentComponents/about-template/about-template.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SideNavComponent,
    AboutNavigationComponent,
    AboutTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialUIModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
