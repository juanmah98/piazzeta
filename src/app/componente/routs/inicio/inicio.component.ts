import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Clave } from 'src/app/interfaces/claves';
import { EmailStorage } from 'src/app/interfaces/email';
import { InternoService } from 'src/app/services/interno.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
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
 
  clavess:Clave[]=[];

  usuarios: EmailStorage[] = [];
  user: User = {
   
      id_usuario: "",
      email: "",
      clave: ""        
    
  }

  uuidToReadableMap: Record<string, string> = {};
  retrievedUUID = ""


  constructor(private formBuilder: FormBuilder, private usuariosApi:UsuariosService, private _InternoService: InternoService, private router: Router) {

    this.registerForm = this.formBuilder.group(
      {
        id: [""],      
      },
      
    )
  
   }

   message: boolean = true;
   login:string="0";
 
   @Output() messageEvent = new EventEmitter<boolean>();
 

   // Método para crear un usuario
  crearUsuario(): void {
    const data = {
      email: "haloa-aaaa@hotmail.com",
      clave: "aaaa"    
    };

    this.usuariosApi.postUser(data).subscribe(
      (response) => {
        console.log('Usuario creado con éxito', response);
      },
      (error) => {
        console.error('Error al crear usuario', error);
      }
    );
  }
 
   sendMessage() {
     this.messageEvent.emit(this.message)
   }  
   ngOnInit(): void {


    this.usuariosApi.getEmails().subscribe((data: any) => {
      this.usuarios = data;
      console.log(data);
    });
      
    setTimeout(()=>{                           
      google.accounts.id.initialize({
        /* LOCAL */
          client_id: '501716064015-c8od71c598jvqprag4vi88s2kkjr4sge.apps.googleusercontent.com',   
        /*  */
        /* client_id: '501716064015-ghs2q8lm72me0bk9784ukjphu5p49jnj.apps.googleusercontent.com',  */
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

      
          document.location.href = "/loading/email" 
     }
     console.log("Fin google btn");    
   }
 

   async onSumbit(){
   /* this._InternoService.setControl('2'); */
    this.usuariosApi.getUsers().subscribe(async (data: any) => {
      this.usuarios = data;
      for (let i = 0; i < data.length; i++) {       
        if(data[i].id_usuario == this.registerForm.value.id){
          sessionStorage.setItem("login", '2');
          this.user.id_usuario=data[i].id_usuario;
          this.user.email=data[i].email;
          this.user.clave=data[i].clave;          
          this._InternoService.setControl('2');
          this._InternoService.setUser(this.user);
          this.router.navigate(['/loading/clave']);
          /* document.location.href = "/principal"  */
        }
      }    

      
    });
 
  }
}