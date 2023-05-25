import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar-component',
  templateUrl: './calendar-component.component.html',
  styleUrls: ['./calendar-component.component.css']
})
export class CalendarComponentComponent implements OnInit {
  months: { name: string; days: string[]; year: number }[];
  currentMonth: { name: string; days: string[]; year: number };
  fechaOriginal = '23-mayo-2023';
  variableParaPasar = '';
  @Output() variableEnviada = new EventEmitter<string>();

  constructor() {
    const currentYear = new Date().getFullYear();
    this.months = this.generateYearCalendar(currentYear);
    this.currentMonth = this.months[new Date().getMonth()];
  }
  ngOnInit(): void {
   
    const currentYear = new Date().getFullYear();
    this.months = this.generateYearCalendar(currentYear);
    this.currentMonth = this.months[new Date().getMonth()];
  }
  

  enviarVariable(variable:string) {    
    this.variableEnviada.emit(variable);
  }
  private generateYearCalendar(year: number): { name: string; days: string[]; year: number }[] {
    const months: { name: string; days: string[]; year: number }[] = [];

    for (let month = 0; month < 12; month++) {
      const date = new Date(year, month, 1);
      const monthName = date.toLocaleString('default', { month: 'long' });
      const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      const monthDays: string[] = [];

      for (let i = 1; i <= daysInMonth; i++) {
        monthDays.push(i.toString());
      }

      months.push({ name: monthName, days: monthDays, year: year });
    }

    return months;
  }

  previousMonth() {
    const currentIndex = this.months.indexOf(this.currentMonth);
    const previousIndex = currentIndex === 0 ? this.months.length - 1 : currentIndex - 1;
    this.currentMonth = this.months[previousIndex];
  }

  nextMonth() {
    const currentIndex = this.months.indexOf(this.currentMonth);
    const nextIndex = currentIndex === this.months.length - 1 ? 0 : currentIndex + 1;
    this.currentMonth = this.months[nextIndex];
  }

  dia(dia:any){
    console.log(dia);
    console.log(this.months);
    console.log(dia+"-"+this.currentMonth.name+"-"+this.currentMonth.year);
    const fecha  = dia+"-"+this.currentMonth.name+"-"+this.currentMonth.year
    const res = this.convertirFecha(fecha);
    console.log("respuesta:" + res);
    this.enviarVariable(res);
  }

  convertirFecha(fecha: string): string {
    // Dividir la fecha en día, mes y año
    const partesFecha = fecha.split('-');
    const dia = parseInt(partesFecha[0], 10);
    const mes = partesFecha[1];
    const anio = parseInt(partesFecha[2], 10);
  
    // Crear un objeto de fecha utilizando los valores obtenidos
    const fechaObj = new Date(anio, this.obtenerIndiceMes(mes), dia);
  
    // Obtener los componentes de la fecha en el formato deseado
    const anioFormateado = fechaObj.getFullYear();
    const mesFormateado = this.completarCeros(fechaObj.getMonth() + 1);
    const diaFormateado = this.completarCeros(fechaObj.getDate());
  
    // Combinar los componentes de la fecha en el formato final
    const fechaFinal = `${anioFormateado}-${mesFormateado}-${diaFormateado}`;
  
    return fechaFinal;
  }
  
  obtenerIndiceMes(mes: string): number {
    // Mapear los nombres de los meses a su índice correspondiente
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
  
    return meses.indexOf(mes.toLowerCase());
  }
  
  completarCeros(numero: number): string {
    // Completar con ceros a la izquierda si el número es menor a 10
    return numero < 10 ? `0${numero}` : numero.toString();
  }
  
  // Ejemplo de uso
 
  
}