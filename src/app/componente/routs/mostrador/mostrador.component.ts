import { Component, OnInit } from '@angular/core';
import { Pedidos } from 'src/app/interfaces/pedido';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-mostrador',
  templateUrl: './mostrador.component.html',
  styleUrls: ['./mostrador.component.css']
})
export class MostradorComponent implements OnInit {

  constructor(private pedidosServices: PedidosService) { }
  pedi:Pedidos[] = [];
  pediListo:Pedidos[] = [];


  ngOnInit(): void {
    this.pedidosServices.getPedidos().subscribe(pedidos => {
      console.log(pedidos);
      this.pedi = pedidos.sort((a, b) => {
        return a.time - b.time;
      });
     
    })

    this.pedidosServices.getPedidosListo().subscribe(pedidosListos => {
      console.log(pedidosListos);
      this.pediListo = pedidosListos.sort((a, b) => {
        return a.time - b.time;
      });
     
    })
  }

 async onClickDelete(pedido:Pedidos){

  const response = await this.pedidosServices.deletePedido(pedido);
  console.log(response);

}


async onClickListo(pedido:Pedidos){

  this.pedidosServices.addPedidoListo(pedido);
  const response = await this.pedidosServices.deletePedido(pedido);
  console.log(response);

}

async onClickDeleteListo(pedido:Pedidos){

  const response = await this.pedidosServices.deletePedidoListo(pedido);
  console.log(response);

}

}
