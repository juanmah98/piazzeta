import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Pedidos } from 'src/app/interfaces/pedido';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-mostrador',
  templateUrl: './mostrador.component.html',
  styleUrls: ['./mostrador.component.css']
})
export class MostradorComponent implements OnInit {

  registerForm: any;


  constructor(private formBuilder: FormBuilder,private pedidosServices: PedidosService) { 

    this.registerForm = this.formBuilder.group(
      {
        id: [""],  
        mesa: [""],      
        pedido:[""],     
       
     
      },
      
    )
  }
  pedi:Pedidos[] = [];
  pediListo:Pedidos[] = [];
  textoDeInput = "";
  textoDeMesa = 0;
  pedidoEditar: Pedidos = {
    id: '',
    mesa: 0,
    pedido: '',
    time: undefined
  };

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

async onEdit(){
  
 
  console.log(this.registerForm.value.id);  
  this.pedidoEditar.mesa = this.registerForm.value.mesa;
  this.pedidoEditar.pedido = this.registerForm.value.pedido;
  
  const response = await this.pedidosServices.editPedido(this.pedidoEditar);
  console.log("Edit");
  console.log("Pedido a editar: "+this.pedidoEditar.id)
  console.log("Editado: "+response); 
}

async onEditListo(){
  
 
  console.log(this.registerForm.value.id);  
  this.pedidoEditar.mesa = this.registerForm.value.mesa;
  this.pedidoEditar.pedido = this.registerForm.value.pedido;
  
  const response = await this.pedidosServices.editPedidoListo(this.pedidoEditar);
  console.log("Edit");
  console.log("Pedido a editar: "+this.pedidoEditar.id)
  console.log("Editado: "+response); 
}

editForm(pedido:Pedidos){
  this.pedidoEditar = pedido;
  this.textoDeInput=pedido.pedido;
  this.textoDeMesa = pedido.mesa;
  this.registerForm.value = pedido;
  console.log("Pedido a editar: "+pedido.id)
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
