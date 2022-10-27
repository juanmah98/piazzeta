import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {

    this.registerForm = this.formBuilder.group(
      {
       
        mesa: [""],      
        pedido:[""],
      },
      
    )
  
   }
  ngOnInit(): void {
  }

  onSumbit(){
    console.log(this.registerForm.value.mesa);

   
      this.pedido = this.wtsp + '&text=_*MESA*_' + this.registerForm.value.mesa + '%0A*Pedido:*%0A' + this.registerForm.value.pedido ;
     
      window.location.href = this.pedido ; 
    
      

    /* window.location.href = pedido; */
       
  }

  onCocina(){
    this.pedido2 = this.wtsp2 + '&text=_*MESA*_' + this.registerForm.value.mesa + '%0A*Pedido:*%0A' + this.registerForm.value.pedido ;
    window.location.href = this.pedido2 ; 
    this.onReset();
   /*  this.onReset(); */
  }

  onReset(){
    this.registerForm.reset();
  }
}
