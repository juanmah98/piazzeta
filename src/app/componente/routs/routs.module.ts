import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { InicioComponent } from './inicio/inicio.component';


@NgModule({
  declarations: [

    InicioComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[

  ]
})
export class RoutsModule { }
