import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { MaterialUIModule } from './modules/material-ui.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { AboutNavigationComponent } from './components/contentComponents/about-navigation/about-navigation.component';
import { AboutTemplateComponent } from './components/contentComponents/about-template/about-template.component';
import { BasicNavigationComponent } from './components/contentComponents/about-navigation/basic-navigation/basic-navigation.component';
import { ParamsComponent } from './components/contentComponents/about-navigation/params/params.component';
import { ProgrammNavigationComponent } from './components/contentComponents/about-navigation/programm-navigation/programm-navigation.component';
import { ChildNavigationComponent } from './components/contentComponents/about-navigation/child-navigation/child-navigation.component';
import { GuardsComponent } from './components/contentComponents/about-navigation/guards/guards.component';
import { AboutOthersComponent } from './components/contentComponents/about-others/about-others.component';
import { SwiperComponent } from './components/contentComponents/about-others/swiper/swiper.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SideNavComponent,
    AboutNavigationComponent,
    AboutTemplateComponent,
    BasicNavigationComponent,
    ParamsComponent,
    ProgrammNavigationComponent,
    ChildNavigationComponent,
    GuardsComponent,
    AboutOthersComponent,
    SwiperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialUIModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
