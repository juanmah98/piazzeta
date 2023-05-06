import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
  styleUrls: ['./horas.component.css']
})
export class HorasComponent implements OnInit {

  nombres:string[] = ['Juan', 'Virginia', 'Carolina', 'Alba'];
  fechaActual: Date = new Date();
  dia: string = this.fechaActual.toLocaleDateString('es-ES', { weekday: 'long' });
  mes: string = this.fechaActual.toLocaleDateString('es-ES');
  constructor() { }

  ngOnInit(): void {
    
  }

}
