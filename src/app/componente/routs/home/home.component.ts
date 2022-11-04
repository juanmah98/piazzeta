import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


import { PedidosService } from 'src/app/services/pedidos.service';

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

  
  registerForm: any;


  constructor(private formBuilder: FormBuilder, private placesService: PedidosService) {

    this.registerForm = this.formBuilder.group(
      {
        id: [""],  
        mesa: [""],      
        pedido:[""],
       
     
      },
      
    )
  
   }
  ngOnInit(): void {
   
  }

 async onSumbit(){

  
    console.log(this.registerForm.value);

      /* this.pedido = this.wtsp + '&text='+ '*Mesa:*%0A' + this.registerForm.value.mesa + '%0A*Pedido:*%0A' + this.registerForm.value.pedido ;
     
      window.location.href = this.pedido ;  */
    if(this.registerForm.value.mesa != "" && this.registerForm.value.pedido != ""){

      const respnse = await this.placesService.addPedido(this.registerForm.value);
      console.log(respnse);
      this.onReset();
      window.location.href = "/home" ;
    }
   
  
       
  }





  onReset(){
    this.registerForm.reset();
  }
}
