import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { HeaderComponent } from './header/header.component';

const components = [
  HeaderComponent,
];
const modules = [
  NzLayoutModule,
  NzInputModule,
  NzButtonModule,
  NzGridModule,
  NzTypographyModule
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [...components, ...modules]
})
export class UiModule { }
