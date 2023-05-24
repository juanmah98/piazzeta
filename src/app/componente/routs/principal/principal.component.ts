import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor() { }

  lista:boolean = false;
  cuadricula:boolean = true;
  ngOnInit(): void {
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
