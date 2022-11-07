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
  
  
  ngOnInit(): void {
    
    this.pedidosServices.getTotalDia(this.dia.replace(/\//g, "")).subscribe(pedidos => {
     
      this.pedi = pedidos.sort((a, b) => {
        return a.time - b.time;
      });
      console.log(this.pedi);
     
    })

    
  }

  time(){
   
    this.pedidosServices.getTotalDia(this.fecha).subscribe(pedidos => {
     
      this.pedi = pedidos.sort((a, b) => {
        return a.time - b.time;
      });
      console.log(this.pedi);
     
    })
    this.dia = this.fecha;
    console.log(this.dia.replace(/\//g, ""));
  }

}
