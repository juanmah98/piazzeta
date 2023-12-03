import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { serverTimestamp } from '@firebase/firestore';
import { EmailStorage } from 'src/app/interfaces/email';
import { ComandasService } from 'src/app/services/comandas.service';
import { InternoService } from 'src/app/services/interno.service';


import { PedidosService } from 'src/app/services/pedidos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  wtsp = 'https://api.whatsapp.com/send?phone=647911999';
  wtsp2 = 'https://api.whatsapp.com/send?phone=603686778';
  pedido = "";
  pedido2 = "";
  email: string ="";

  em:EmailStorage[] =[];
  user:EmailStorage={
    id: '',
    email: ''
  };

  userId:string="";
  
  registerForm: any;

  idUsuario='';
  router: any;

  constructor(private formBuilder: FormBuilder, private placesService: PedidosService, private _ComandasApi: ComandasService, private _InternoService:InternoService) {

    this.registerForm = this.formBuilder.group(
      {
       
        mesa: [""],      
        pedido:[""],       
        edit:[false]
       
     
      },
      
    )
  
   }
  ngOnInit(): void {
    let email = sessionStorage.getItem("email") as string;
    this.email = email;

    this._InternoService.miUser$.subscribe(valor => {

      this.idUsuario = valor.id_usuario;
    });

  }

 async onSumbit():Promise<void>{
    console.log(this.registerForm.value);
     
    if(this.registerForm.value.mesa != "" && this.registerForm.value.pedido != ""){

    
        const data = {
          id_usuario: this.idUsuario, 
          mesa: this.registerForm.value.mesa,
          contenido: this.registerForm.value.pedido,
          estado: "FALSE"    
        };
        this._ComandasApi.postComanda(data).subscribe(
          (response) => {
            console.log('Usuario creado con éxito', response);
            /* this.router.navigate(['/user']); */
            this.ngOnInit();
          },
          (error) => {
            console.error('Error al crear usuario', error);
          }
        );
      

 
      this.onReset();
     /*  this.router.navigate(['/home']); */
    }
   
  }




  onReset(){
    this.registerForm.reset();
  }
}
