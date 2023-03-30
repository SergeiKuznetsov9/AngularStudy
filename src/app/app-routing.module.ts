import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutNavigationComponent } from './components/contentComponents/about-navigation/about-navigation.component';
import { AboutTemplateComponent } from './components/contentComponents/about-template/about-template.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path: 'navigation', component: AboutNavigationComponent},
  {path: 'template', component: AboutTemplateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
