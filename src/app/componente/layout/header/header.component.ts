import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  login: string = "0";

  ngOnInit(): void {
    let log = sessionStorage.getItem("login") as string;
   this.login = log;
  }

  salir(){
    this.login="0";
    sessionStorage.setItem("email","");
    sessionStorage.setItem("name", "");
    sessionStorage.setItem("picture", "");
    sessionStorage.setItem("login", "0");
    document.location.href = "/inicio"   

  }

}
