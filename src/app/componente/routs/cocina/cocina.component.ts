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
  registerFormEdit: any;
  a:string = "";
  hoy:any = "";
  dia:any = "";
  turnoEditar: Turnos = {
    id: '',
    cliente: "",
    telefono: 0,
    fecha: "",
    hora:0,
    precio:0,
    sena:0,
    observacion:"",
    edit: false
  };
  constructor(private formBuilder: FormBuilder,private pedidosServices: PedidosService) {

    this.registerForm = this.formBuilder.group(
      {    
        fecha: [""],

      },
      
    );

    this.registerFormEdit = this.formBuilder.group(
      {
        id: [""],  
        cliente: [""],
        telefono: [""],
        fecha: [""],
        hora: [""],
        precio: [""],
        sena: [""],                                    
        observacion:[""],       
        edit:[false]
       
     
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
    this.hoy = new Date();
    this.a = this.hoy.toLocaleDateString();
    console.log(this.a)
    console.log(this.hoy);
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
  if(this.registerForm.value.fecha == ""){
    this.registerForm.value.fecha = this.hoy.toISOString().split('T')[0];
    console.log(this.registerForm.value.fecha)
    this.pedidosServices.getTurno(this.id, this.registerForm.value.fecha).subscribe(turnos => {
    
    
      this.pedi = turnos.sort((a, b) => {
        console.log(a.hora + b.hora)
        return a.hora.replace(/\:/g, "") - b.hora.replace(/\:/g, "");
        
      });
      console.log(this.pedi);
      
    })
    
  }else{

 
  this.pedidosServices.getTurno(this.id, this.registerForm.value.fecha).subscribe(turnos => {
    
    
    this.pedi = turnos.sort((a, b) => {
      console.log(a.hora + b.hora)
      return a.hora.replace(/\:/g, "") - b.hora.replace(/\:/g, "");
      
    });
    console.log(this.pedi);
    
  })
}
  this.dia=this.registerForm.value.fecha;
  
}

cliente:string="";
telefono:number = 0;
fecha:Date = new Date();
hora:number = 0;
precio:number = 0;
sena:number = 0;                                 
observacion:string="";       
edit:boolean=false;


async onEdit(){
  
 
  console.log(this.registerForm.value.id);  
  this.turnoEditar.cliente = this.registerFormEdit.value.cliente;
  this.turnoEditar.telefono = this.registerFormEdit.value.telefono;
  this.turnoEditar.fecha = this.registerFormEdit.value.fecha;
  this.turnoEditar.hora = this.registerFormEdit.value.hora;
  this.turnoEditar.precio = this.registerFormEdit.value.precio;
  this.turnoEditar.sena = this.registerFormEdit.value.sena;
  this.turnoEditar.observacion = this.registerFormEdit.value.observacion;
  this.registerFormEdit.edit = true;
  this.turnoEditar.edit = true
  
  const response = await this.pedidosServices.editTurno(this.turnoEditar, this.id, this.fecha);
  console.log("Edit");
  console.log("Pedido a editar: "+this.turnoEditar.id)
  console.log("Editado: "+response); 
}


editForm(turno:Turnos){
  this.turnoEditar = turno;
  this.cliente = turno.cliente
  this.telefono = turno.telefono
  this.fecha = turno.fecha
  this.hora = turno.hora
  this.precio = turno.precio
  this.sena = turno.sena
  this.observacion = turno.observacion
  this.edit = turno.edit;

  this.registerFormEdit.value = turno;
  console.log("Pedido a editar: "+turno.id)

/*   this.p.id = "";
  this.p.mesa = pedido.mesa;
  this.p.pedido = pedido.pedido;
  this.p.time = pedido.time;
  this.p.day = this.dia;
  this.p.edit=pedido.edit; */
}

}
