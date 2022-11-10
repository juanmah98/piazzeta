import { Component, OnInit } from '@angular/core';
import { Save } from 'src/app/interfaces/save';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  
  pedi: Save[] = [];
  indice:number = 0;
  fecha:any =  new Date().toLocaleDateString();
  constructor(private pedidosServices: PedidosService) { }
  
  dia:any =  new Date().toLocaleDateString()   ;
  email:string = "";
  
  ngOnInit(): void {
    let log = sessionStorage.getItem("email") as string;
    this.email=log;
    
    this.pedidosServices.getTotalDia(this.dia.replace(/\//g, ""), this.email).subscribe(pedidos => {
     
      this.pedi = pedidos.sort((a, b) => {
        return a.time - b.time;
      });
      console.log(this.pedi);
     
    })

    
  }

  time(){
   
    this.pedidosServices.getTotalDia(this.fecha, this.email).subscribe(pedidos => {
     
      this.pedi = pedidos.sort((a, b) => {
        return a.time - b.time;
      });
      console.log(this.pedi);
     
    })
    this.dia = this.fecha;
    console.log(this.dia.replace(/\//g, ""));
  }

}
