import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutNavigationComponent } from './components/contentComponents/about-navigation/about-navigation.component';
import { AboutTemplateComponent } from './components/contentComponents/about-template/about-template.component';
import { AboutOthersComponent } from './components/contentComponents/about-others/about-others.component';
import { SwiperComponent } from './components/contentComponents/about-others/swiper/swiper.component';
import { BasicNavigationComponent } from './components/contentComponents/about-navigation/basic-navigation/basic-navigation.component';
import { ChildNavigationComponent } from './components/contentComponents/about-navigation/child-navigation/child-navigation.component';
import { ProgrammNavigationComponent } from './components/contentComponents/about-navigation/programm-navigation/programm-navigation.component';
import { GuardsComponent } from './components/contentComponents/about-navigation/guards/guards.component';
import { ParamsComponent } from './components/contentComponents/about-navigation/params/params.component';

const othersChildrenRoots: Routes = [
  { path: 'swiper', component: SwiperComponent },
];

const naviagationChildrenRoots: Routes = [
  { path: 'basic', component: BasicNavigationComponent },
  { path: 'child', component: ChildNavigationComponent },
  { path: 'params', component: ParamsComponent },
  { path: 'programm', component: ProgrammNavigationComponent },
  { path: 'guards', component: GuardsComponent },
];

const routes: Routes = [
  {
    path: 'navigation',
    redirectTo: 'navigation/basic',
  },
  {
    path: 'navigation',
    component: AboutNavigationComponent,
    children: naviagationChildrenRoots,
  },
  { path: 'template', component: AboutTemplateComponent },
  {
    path: 'others',
    redirectTo: 'others/swiper',
  },
  {
    path: 'others',
    component: AboutOthersComponent,
    children: othersChildrenRoots,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
