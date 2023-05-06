import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Clave } from 'src/app/interfaces/claves';
import { EmailStorage } from 'src/app/interfaces/email';
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
  em:EmailStorage[] =[];
  user:EmailStorage={
    id: '',
    email: ''
  };
  clavess:Clave[]=[];

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
 
    this.login = "0";
       sessionStorage.setItem("login", this.login);
     this.userServices.getUser().subscribe(prod => {
      console.log(prod);
      this.em = prod;     
      console.log(this.em)
    });
      
    setTimeout(()=>{                           
      google.accounts.id.initialize({
        /* LOCAL */
         client_id: '501716064015-c8od71c598jvqprag4vi88s2kkjr4sge.apps.googleusercontent.com',  
        /*  */
         /*  client_id: '501716064015-ghs2q8lm72me0bk9784ukjphu5p49jnj.apps.googleusercontent.com',  */
        callback: this.handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
  }, 200);
    
      
     
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

       /*  for (var i = 0; i < this.em.length; i++) {
          console.log("DENTRO DEL FOR");
          if (this.objetounico.email == this.em[i]) {
            console.log("ES IGUAL");
          }
        } */
        
       


      
      
    
     }
     console.log("Fin google btn");    
   }
 
 
   singin(){
    this.user.email=this.objetounico.email;
     this.message = false;
     this.sendMessage();
   }


 async onSumbit(){
 
 await this.userServices.getUser().subscribe(prod => {
   
    this.em = prod;     
 
    for (var i = 0; i < this.em.length; i++) {

     this.userServices.getId(prod[i].id).subscribe(clave => {
       
        this.clavess = clave;

        if(this.clavess[0].clave == this.registerForm.value.id){
          
          sessionStorage.setItem("email", this.clavess[0].email);
          this.login = "2";
          sessionStorage.setItem("login", this.login);
           document.location.href = "/home"     

        }
      });
    }
   
  });
 
  }


}
