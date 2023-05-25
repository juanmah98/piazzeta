import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CocinaComponent } from '../cocina/cocina.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  @ViewChild(CocinaComponent) cocinaComponent: CocinaComponent | undefined;
 a = "";
 @Output() eventoClic = new EventEmitter<void>();
  constructor() { }
  variableParaPasar = ' ';
  lista:boolean = false;
  cuadricula:boolean = true;
  ngOnInit(): void {
   
  }

  recibirVariable(variable: string) {
    this.a=variable;
    console.log('Variable recibida en el componente padre:', variable);
    this.variableParaPasar = variable;
    setTimeout(() => {
      // Lógica de la función que quieres ejecutar después de 1 segundo
      this.manejarClicHijo()
    }, 100)
   

  }

  manejarClicHijo() {
    
    console.log('Evento de clic recibido en el componente padre');
    console.log('envento click enviado');
    this.cocinaComponent?.time();
  }
  

  listaSet(){
   this.cuadricula=true;
   this.lista = false;
  }

  cuadriculaSet(){
    this.cuadricula=false;
    this.lista = true;
   }



}
