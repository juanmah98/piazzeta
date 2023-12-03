import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Comandas } from 'src/app/interfaces/comandas';
import { EmailStorage } from 'src/app/interfaces/email';
import { Pedidos } from 'src/app/interfaces/pedido';
import { Save } from 'src/app/interfaces/save';
import { ComandasService } from 'src/app/services/comandas.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-mostrador',
  templateUrl: './mostrador.component.html',
  styleUrls: ['./mostrador.component.css']
})
export class MostradorComponent implements OnInit {

  registerForm: any;
  dia:any =  new Date().toLocaleDateString()   ;
  totalSeconds = 0;
 


  constructor(private formBuilder: FormBuilder,private pedidosServices: PedidosService, private _ComandaService:ComandasService) { 

    this.registerForm = this.formBuilder.group(
      {
        id: [""],  
        mesa: [""],      
        pedido:[""],     
      },
      
    )
  }
  /* pedi:Pedidos[] = []; */
  textoDeInput = "";
  textoDeMesa = "0";
  pedidoEditar: Comandas = {   
    id_comanda: "",
    contenido: "",
    mesa: "" ,
    estado:false
  };

  p: Save = {
    id: '',
    mesa: 0,
    pedido: '',
    time: undefined,
    edit: false,
    day: ''
  };

  em:EmailStorage={
    id: '',
    email: ''
  };

  user:EmailStorage={
    id: '',
    email: ''
  };

  id:string = "";

  email:string="";
  minutos: number =1;
  segundos: number =1;

  pedi: Comandas[] = []
  pediListo: Comandas[] = []
  
  ngOnInit(): void {
   
   /*  this._ComandaService.getComanda().subscribe((data: Comandas[]) => {
      let i=0;
      let p = 0;
      
      data.forEach((element: Comandas) => {
        if(element.estado==false){
          this.pedi[i++] = element;
        }else{
          this.pediListo[p++] = element;
        }
      });
      
    }); */


    /* let log = sessionStorage.getItem("email") as string;
    this.email=log;
    let id = sessionStorage.getItem("idUser") as string;
    this.id = id;
    this.pedidosServices.getPedidos(id).subscribe(pedidos => {
      console.log(pedidos);
      this.pedi = pedidos.sort((a, b) => {
        return a.time - b.time;
      });
     
    }) */

   
   /*  this.pedidosServices.getPedidosListo(this.id).subscribe(pedidosListos => {
      console.log(pedidosListos);
      this.pediListo = pedidosListos.sort((a, b) => {
        return a.time - b.time;
      });
     
    }) */
    this._ComandaService.getComanda().subscribe((data: Comandas[]) => {
      // Filtra y agrupa las comandas según el estado
      const comandasAgrupadas = this.filtrarPorEstado(data, false);
      const comandasAgrupadasTrue = this.filtrarPorEstado(data, true);
      
  
      // Puedes hacer lo que necesites con las comandas agrupadas
      /* console.log('Comandas con estado false:', comandasAgrupadas[1]);
      console.log('Comandas con estado true:', comandasAgrupadasTrue[0]); */
  
      // Asigna el resultado a this.comanda si es necesario
      this.pedi = comandasAgrupadas[1];
      this.pediListo = comandasAgrupadasTrue[0];
    });

  }

  filtrarPorEstado(arr: Comandas[], estadoAFiltrar: boolean): Comandas[][] {
    const filtradas = arr.filter(comanda => comanda.estado === estadoAFiltrar);
    const agrupadas: Comandas[][] = [[], []];
  
    filtradas.forEach(comanda => {
      if (comanda.estado === true) {
        agrupadas[0].push(comanda);
      } else {
        agrupadas[1].push(comanda);
      }
    });
  
    return agrupadas;
  }


async onEdit(){
  
 
  console.log(this.registerForm.value.id);  
  this.pedidoEditar.mesa = this.registerForm.value.mesa;
  this.pedidoEditar.contenido = this.registerForm.value.pedido;
  this.pedidoEditar.estado = true;
  
 /*  const response = await this.pedidosServices.editPedido(this.pedidoEditar, this.id); */
/*   console.log("Edit");
  console.log("Pedido a editar: "+this.pedidoEditar.id)
  console.log("Editado: "+response);  */
}

async onEditListo(){
  
 
  console.log(this.registerForm.value.id);  
  this.pedidoEditar.mesa = this.registerForm.value.mesa;
  this.pedidoEditar.contenido = this.registerForm.value.pedido;
  this.pedidoEditar.estado = true;
  
 /*  const response = await this.pedidosServices.editPedidoListo(this.pedidoEditar,this.id);
  console.log("Edit");
  console.log("Pedido a editar: "+this.pedidoEditar.id)
  console.log("Editado: "+response);  */
}

editForm(pedido:Comandas){
  this.pedidoEditar = pedido;
  this.textoDeInput=pedido.contenido;
  this.textoDeMesa = pedido.mesa;
  this.registerForm.value = pedido;
/*   console.log("Pedido a editar: "+pedido.id) */

 /*  this.p.id = "";
  this.p.mesa = pedido.mesa;
  this.p.pedido = pedido.pedido;
  this.p.time = pedido.time;
  this.p.day = this.dia;
  this.p.edit=pedido.edit; */
}

async onClickDelete(){

/* let response = await this.pedidosServices.deletePedidoListo(this.pedidoEditar, this.id); */
  
/* console.log(response);
console.log(this.id); */

}

async onClickListo(){
  this.user.id = this.id;
  this.pedidosServices.addPedidoListo(this.p,this.user);
 /*  const response = await this.pedidosServices.deletePedido(this.pedidoEditar, this.id);
  console.log(response); */

}

async onClickDeleteListo(){
/*   
  this.p.id = "";
  this.p.mesa = pedido.mesa;
  this.p.pedido = pedido.pedido;
  this.p.time = pedido.time;
  this.p.day = this.dia;
  this.p.edit=pedido.edit; */

  

   this.pedidosServices.addTotalDia(this.p, this.id); 
 /*  const response = await this.pedidosServices.deletePedidoListo(this.pedidoEditar, this.id);
  console.log(response);
  console.log(this.dia + "pedidos: "+ this.p) */

}


time="";
startTimer() {
  setInterval(() => {
    this.totalSeconds++;
    this.updateTime();
  }, 1000);
}
  updateTime() {
    const minutes = Math.floor(this.totalSeconds / 60);
    const seconds = this.totalSeconds % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    this.time = formattedTime;
    // ...
  }

}
