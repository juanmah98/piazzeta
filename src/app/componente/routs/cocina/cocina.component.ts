import { Component, OnInit } from '@angular/core';
import { EmailStorage } from 'src/app/interfaces/email';
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
  em:EmailStorage={
    id: '',
    email: ''
  };

  user:EmailStorage={
    id: '',
    email: ''
  };

  id:string ="";
  email:string="";
  ngOnInit(): void {
    let log = sessionStorage.getItem("email") as string;
    let id = sessionStorage.getItem("idUser") as string;
    this.id = id;
    this.email=log;
    this.pedidosServices.getPedidos(id).subscribe(pedidos => {
       /* console.log(pedidos);  */
      
       this.pedi = pedidos.sort((a, b) => {
        return a.time - b.time;
      });
     

    
      console.log("Pedido: ", this.pedi);
     
      
    })
  }

 async onClickDelete(pedido:Pedidos){ 
  this.user.id = this.id;
  this.pedidosServices.addPedidoListo(pedido, this.user);
  const response = await this.pedidosServices.deletePedido(pedido,this.id);
  console.log(response);
}

}
