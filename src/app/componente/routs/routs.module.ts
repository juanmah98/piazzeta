import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrincipalComponent } from './principal/principal.component';
import { CocinaComponent } from './cocina/cocina.component';
import { MostradorComponent } from './mostrador/mostrador.component';



@NgModule({
  declarations: [
    HomeComponent,
    PrincipalComponent,
    CocinaComponent,
    MostradorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    HomeComponent,
    MostradorComponent,
    CocinaComponent,
    PrincipalComponent
  ]
})
export class RoutsModule { }
