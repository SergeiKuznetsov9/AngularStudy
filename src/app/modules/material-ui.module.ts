import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSidenavModule} from '@angular/material/sidenav';

const materialUIModules = [
  MatSidenavModule,
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [...materialUIModules]
  ],
  exports: materialUIModules
})
export class MaterialUIModule { }
