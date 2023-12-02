import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternoService } from 'src/app/services/interno.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  control!: string ;
  login!: string; 

  constructor(private _InternoService: InternoService, private router: Router) {
   
  }

  ngOnInit(): void {
    let log = sessionStorage.getItem("login") as string;
    console.log("this.control")
    console.log(this.control)
   
    
    this._InternoService.miControl$.subscribe(valor => {
      this.control = valor;
      this.login = valor;
    });
  }

  salir(){
    /* this.login="0"; */
    sessionStorage.setItem("email","");
    sessionStorage.setItem("name", "");
    sessionStorage.setItem("picture", "");
    sessionStorage.setItem("login", "0");
    /* document.location.href = "/inicio"    */
    this.router.navigate(['/inicio']);
  }

}
