import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAngularModule } from './material-angular.module';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../components/spinner/spinner.component';


@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialAngularModule
  ],
  exports: [
    SpinnerComponent,
    CommonModule,
    FormsModule,
    MaterialAngularModule
  ],
})
export class SharedModule { }
