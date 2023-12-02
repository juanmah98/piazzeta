import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InternoService } from 'src/app/services/interno.service';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports:[
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [InternoService],
})
export class LayoutModule { }
