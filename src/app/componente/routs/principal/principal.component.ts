import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  home(){
    this.router.navigate(['/home']);
  }

  cocina(){
    this.router.navigate(['/cocina']);
  }

  caja(){
    this.router.navigate(['/caja']);
    /* document.location.href = "/principal"  */
  }


}
