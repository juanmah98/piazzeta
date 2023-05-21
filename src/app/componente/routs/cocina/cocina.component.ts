import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmailStorage } from 'src/app/interfaces/email';
import { Pedidos } from 'src/app/interfaces/pedido';
import { Turnos } from 'src/app/interfaces/turno';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css']
})
export class CocinaComponent implements OnInit {
  registerForm: any;
  dia:any = "";
  constructor(private formBuilder: FormBuilder,private pedidosServices: PedidosService) {

    this.registerForm = this.formBuilder.group(
      {    
        fecha: [""],

      },
      
    )
   }
  pedi:Turnos[] = [];
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
    this.time()
 /*    this.pedidosServices.getTurno(id).subscribe(pedidos => {
      
      
       this.pedi = pedidos.sort((a, b) => {
        return a.time - b.time;
      });
     

    
      console.log("Pedido: ", this.pedi);
     
      
    }) */
  }

 async onClickDelete(pedido:Pedidos){ 
  this.user.id = this.id;
  this.pedidosServices.addPedidoListo(pedido, this.user);
  const response = await this.pedidosServices.deletePedido(pedido,this.id);
  console.log(response);
}

time(){
  this.pedidosServices.getTurno(this.id, this.registerForm.value.fecha).subscribe(turnos => {
    
    
    this.pedi = turnos.sort((a, b) => {
      console.log(a.hora + b.hora)
      return a.hora.replace(/\:/g, "") - b.hora.replace(/\:/g, "");
      
    });
    console.log(this.pedi);
    
  })
  this.dia=this.registerForm.value.fecha;
  
}

}
