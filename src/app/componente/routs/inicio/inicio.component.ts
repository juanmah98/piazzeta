import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PedidosService } from 'src/app/services/pedidos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare var google: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  registerForm: any;
  public objetounico:any = {};

  constructor(private formBuilder: FormBuilder, private userServices: UsuariosService) {

    this.registerForm = this.formBuilder.group(
      {
        id: [""],      
      },
      
    )
  
   }

   message: boolean = true;
   login:string="0";
 
   @Output() messageEvent = new EventEmitter<boolean>();
 
 
   sendMessage() {
     this.messageEvent.emit(this.message)
   }  
   ngOnInit(): void {
 
     
    
       google.accounts.id.initialize({
         /* LOCAL */
          client_id: '501716064015-c8od71c598jvqprag4vi88s2kkjr4sge.apps.googleusercontent.com', 
         /*  */
          /* client_id: '1064213116404-t6okm41beb23vk6pihfa6lu1nc01in44.apps.googleusercontent.com',   */
         callback: this.handleCredentialResponse
       });
       google.accounts.id.renderButton(
         document.getElementById("buttonDiv"),
         { theme: "outline", size: "large" }  // customization attributes
       );
       google.accounts.id.prompt(); // also display the One Tap dialog
     
   }
 
   handleCredentialResponse(response:any){
    
 
     if(response.credential){
       this.login = "1";
       sessionStorage.setItem("login", this.login);
       
       
       response.credential;
       
       var base64Url =  response.credential.split('.')[1];
       var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
       var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c){
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        this.objetounico = JSON.parse(jsonPayload);
        console.log( JSON.parse(jsonPayload));
        
        sessionStorage.setItem("email", this.objetounico.email);
        sessionStorage.setItem("name", this.objetounico.name);
        sessionStorage.setItem("picture", this.objetounico.picture);
        console.log(this.objetounico.email);
         document.location.href = "/user"   

      
      
    
     }
   }
 
 
   singin(){
     this.message = false;
     this.sendMessage();
   }

 async onSumbit(){
   
 const a= this.userServices.getUsers().subscribe(prod => {
    console.log(prod);
  });
  console.log(a);
   
  }


}
