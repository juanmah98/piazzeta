import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  home(){
    window.location.href = "/home"
  }

  cocina(){
    window.location.href = "/cocina"
  }

  caja(){
    window.location.href = "/caja"
  }


}
