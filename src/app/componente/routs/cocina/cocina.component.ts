import { Component, OnInit } from '@angular/core';
import { Pedidos } from 'src/app/interfaces/pedido';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css']
})
export class CocinaComponent implements OnInit {

  constructor(private pedidosServices: PedidosService) { }
  pedi:Pedidos[] = [];
  email:string="";
  ngOnInit(): void {
    let log = sessionStorage.getItem("email") as string;
    this.email=log;
    this.pedidosServices.getPedidos(log).subscribe(pedidos => {
       /* console.log(pedidos);  */
      
       this.pedi = pedidos.sort((a, b) => {
        return a.time - b.time;
      });
     

    
      console.log("Pedido: ", this.pedi);
     
      
    })
  }

 async onClickDelete(pedido:Pedidos){ 
  this.pedidosServices.addPedidoListo(pedido, this.email);
  const response = await this.pedidosServices.deletePedido(pedido,this.email);
  console.log(response);
}

}
