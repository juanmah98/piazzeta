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
  ngOnInit(): void {
    this.pedidosServices.getPedidos().subscribe(pedidos => {
       /* console.log(pedidos);  */
      
       this.pedi = pedidos;
     

    
      console.log("Pedido: ", pedidos);
     
      
    })
  }

 async onClickDelete(pedido:Pedidos){
  this.pedidosServices.addPedidoListo(pedido);
  const response = await this.pedidosServices.deletePedido(pedido);
  console.log(response);
}

}
