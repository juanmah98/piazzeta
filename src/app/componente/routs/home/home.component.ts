import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { serverTimestamp } from '@firebase/firestore';
import { EmailStorage } from 'src/app/interfaces/email';


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


  constructor(private formBuilder: FormBuilder, private placesService: PedidosService, private userServices: UsuariosService) {

    this.registerForm = this.formBuilder.group(
      {
        id: [""],  
        mesa: [""],      
        pedido:[""],
        time: [serverTimestamp()],
        edit:[false]
       
     
      },
      
    )
  
   }
  ngOnInit(): void {
    let email = sessionStorage.getItem("email") as string;
    this.email = email;

    /* this.userServices.getUser().subscribe(prod => {
  
      this.em = prod;     
   
      for (var i = 0; i < this.em.length; i++) {
        
        console.log(this.email)
        if(this.em[i].email == email){
          console.log(this.em[i].id)
          sessionStorage.setItem("idUser", this.em[i].id);
          this.user.id = this.em[i].id;
          this.user.email = this.em[i].email;
        }
      
      }
      
    }); */
  
    

   
  }

 async onSumbit(){
    console.log(this.registerForm.value);
      /* this.pedido = this.wtsp + '&text='+ '*Mesa:*%0A' + this.registerForm.value.mesa + '%0A*Pedido:*%0A' + this.registerForm.value.pedido ;
     
      window.location.href = this.pedido ;  */
    if(this.registerForm.value.mesa != "" && this.registerForm.value.pedido != ""){

      const respnse = await this.placesService.addPedido(this.registerForm.value, this.user);
      console.log(respnse);
      this.onReset();
      window.location.href = "/home" ;
    }
   
  }




  onReset(){
    this.registerForm.reset();
  }
}
