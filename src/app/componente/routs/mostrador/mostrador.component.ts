import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Pedidos } from 'src/app/interfaces/pedido';
import { Save } from 'src/app/interfaces/save';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-mostrador',
  templateUrl: './mostrador.component.html',
  styleUrls: ['./mostrador.component.css']
})
export class MostradorComponent implements OnInit {

  registerForm: any;
  dia:any =  new Date().toLocaleDateString()   ;
 


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
    time: undefined,
    edit: false
  };

  p: Save = {
    id: '',
    mesa: 0,
    pedido: '',
    time: undefined,
    edit: false,
    day: ''
  };

  email:string="";

  ngOnInit(): void {
    let log = sessionStorage.getItem("email") as string;
    this.email=log;
    this.pedidosServices.getPedidos(log).subscribe(pedidos => {
      console.log(pedidos);
      this.pedi = pedidos.sort((a, b) => {
        return a.time - b.time;
      });
     
    })

   
    this.pedidosServices.getPedidosListo(this.email).subscribe(pedidosListos => {
      console.log(pedidosListos);
      this.pediListo = pedidosListos.sort((a, b) => {
        return a.time - b.time;
      });
     
    })
  }

 async onClickDelete(pedido:Pedidos){

  const response = await this.pedidosServices.deletePedido(pedido, this.email);
  console.log(response);

}

async onEdit(){
  
 
  console.log(this.registerForm.value.id);  
  this.pedidoEditar.mesa = this.registerForm.value.mesa;
  this.pedidoEditar.pedido = this.registerForm.value.pedido;
  this.pedidoEditar.edit = true;
  
  const response = await this.pedidosServices.editPedido(this.pedidoEditar, this.email);
  console.log("Edit");
  console.log("Pedido a editar: "+this.pedidoEditar.id)
  console.log("Editado: "+response); 
}

async onEditListo(){
  
 
  console.log(this.registerForm.value.id);  
  this.pedidoEditar.mesa = this.registerForm.value.mesa;
  this.pedidoEditar.pedido = this.registerForm.value.pedido;
  this.pedidoEditar.edit = true;
  
  const response = await this.pedidosServices.editPedidoListo(this.pedidoEditar, this.email);
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

  this.pedidosServices.addPedidoListo(pedido,this.email);
  const response = await this.pedidosServices.deletePedido(pedido, this.email);
  console.log(response);

}

async onClickDeleteListo(pedido:Pedidos){
  
  this.p.id = "";
  this.p.mesa = pedido.mesa;
  this.p.pedido = pedido.pedido;
  this.p.time = pedido.time;
  this.p.day = this.dia;
  this.p.edit=pedido.edit;

  

   this.pedidosServices.addTotalDia(this.p, this.email); 
  const response = await this.pedidosServices.deletePedidoListo(pedido, this.email);
  console.log(response);
  console.log(this.dia + "pedidos: "+ this.p)

}



}
