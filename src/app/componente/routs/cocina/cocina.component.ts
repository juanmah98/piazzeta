import { Component, OnInit } from '@angular/core';
import { Comandas } from 'src/app/interfaces/comandas';
import { EmailStorage } from 'src/app/interfaces/email';
import { Pedidos } from 'src/app/interfaces/pedido';
import { User } from 'src/app/interfaces/user';
import { ComandasService } from 'src/app/services/comandas.service';
import { InternoService } from 'src/app/services/interno.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css']
})
export class CocinaComponent implements OnInit {

  constructor(private pedidosServices: PedidosService, private _InternoService:InternoService, private _ComandaService:ComandasService) { }

  em:EmailStorage={
    id: '',
    email: ''
  };

  user: User = {   
    id_usuario: "",
    email: "",
    clave: "" 
  }

  comanda: Comandas[] = [{   
    id_comanda: "",
    contenido: "",
    mesa: "" ,
    estado:false
  }]



  id:string ="";
  email:string="";
  ngOnInit(): void {


    this._ComandaService.getComandas().subscribe((data: any) => {
      this.comanda = data;     
      
    });

  /*   this._InternoService.miUser$.subscribe(valor => {
      this.user = valor;     
          });
    this.id = id;
    this.email=log;
    this.pedidosServices.getPedidos(id).subscribe(pedidos => {
    
      
       this.pedi = pedidos.sort((a, b) => {
        return a.time - b.time;
      });
     

    
      console.log("Pedido: ", this.pedi);
     
      
    }) */
  }

 async onClickDelete(pedido:Comandas){ 
/*   this.user.id = this.id;
  this.pedidosServices.addPedidoListo(pedido, this.user);
  const response = await this.pedidosServices.deletePedido(pedido,this.id);
  console.log(response); 

  const data = {
    email: this.email,
    clave: this.registerForm.value.clave    
  }; */


   const someValue = pedido.id_comanda;
      const otherValue = true;
  
      this._ComandaService.updateComanda(someValue, otherValue).subscribe(
        (response) => {
          console.log('Usuario actualizado exitosamente', response);          
         /*  this.ngOnInit(); */
          // Realiza acciones adicionales si es necesario
        },
        (error) => {
          console.error('Error al actualizar usuario', error);
          // Maneja el error de acuerdo a tus necesidades
        }
      );
}  

}

