import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoleNamePipe } from './hole-name.pipe';
import { SumPipe } from './sum.pipe';

@NgModule({
  declarations: [HoleNamePipe, SumPipe],
  exports: [
    HoleNamePipe,
    SumPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
