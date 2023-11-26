import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Clave } from 'src/app/interfaces/claves';
import { EmailStorage } from 'src/app/interfaces/email';
import { PedidosService } from 'src/app/services/pedidos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  registerForm: any;
  public objetounico:any = {};
  clave:string = "";
  email: string ="";
  name:string ="";
  picture:string="";
  change:boolean=false;
  
  users: Clave = {
    id: '',
    clave: '',
    email: ''
  };
  response: Clave[] = [];
  em: EmailStorage[] = [];
  userId:EmailStorage={
    id: '',
    email: ''
  };
  idUsuario:string = "";

  constructor(private formBuilder: FormBuilder, private userServices: UsuariosService) {

    this.registerForm = this.formBuilder.group(
      {
        claves: [""],      
      },
      
    )
  
   }
  

  ngOnInit(): void {

    let email = sessionStorage.getItem("email") as string;
    let name = sessionStorage.getItem("name") as string;
    let picture = sessionStorage.getItem("picture") as string;
    
    this.email = email;
    this.name = name;
    this.picture = picture;
    this.userId.email=email;
   

    
 
    /* setTimeout(() =>{
      if(userNew == true){
        this.userServices.addUser(this.userId) 
            console.log("Fin onUser");  
            userNew = false; 
      }
  }, 1000); */

    
   
 
    
   
  }

  async onSumbit(){
    this.users.clave = this.registerForm.value.claves;
    this.users.email= this.email;

   
      console.log(this.users.id)
      console.log("Generando clave");
     this.userId.email=this.email;
     this.userId.id = this.idUsuario;
            /* await this.userServices.addId(this.users, this.userId);  */
        console.log("Se agrego nueva clave");
  
  }

  async onChange(){
    this.users.clave = this.registerForm.value.claves;
    this.users.email= this.email;  
    this.users.id = this.response[0].id;
    this.userId.email=this.email;
     this.userId.id = this.idUsuario;
   
      /*   await  this.userServices.editId(this.users, this.userId); */
        console.log("Se actualizo clave");
 
      
     console.log("listo el cambio")
     
     
  }

  /* private decodificarJwt(token:string){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c){
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } */

}
