import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Clave } from 'src/app/interfaces/claves';
import { EmailStorage } from 'src/app/interfaces/email';
import { User } from 'src/app/interfaces/user';
import { InternoService } from 'src/app/services/interno.service';
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
  change:boolean=true;
  
  user: User = {
   
    id_usuario: "",
    email: "",
    clave: ""        
  
}
  em: EmailStorage[] = [];
  userId:EmailStorage={
    id: '',
    email: ''
  };
  idUsuario:string = "";

  usuarios: any[] = [];

  uuidToReadableMap: Record<string, string> = {};
  readableFormat = ""
  constructor(private formBuilder: FormBuilder, private usuariosApi:UsuariosService, private _InternoService:InternoService) {

    this.registerForm = this.formBuilder.group(
      {
        claves: [""],      
      },
      
    )
  
   }
  

  ngOnInit(): void {

    this._InternoService.miUser$.subscribe(valor => {
      this.user = valor;     
      this.clave=valor.id_usuario;
      this.name=valor.clave;
      this.email=valor.email;
          });

/*     let email = sessionStorage.getItem("email") as string;
    let name = sessionStorage.getItem("name") as string; */
    let picture = sessionStorage.getItem("picture") as string;
    
    /* this.email = this.user.email;
    this.clave  = this.user.id_usuario;
    this.name = this.user.clave;  */
    this.picture = picture;
   
  /*   this.usuariosApi.getUsers().subscribe((data: any) => {
      this.usuarios = data;
      let registred = false;
      for (let i = 0; i < data.length; i++) {
        if(data[i].email == email){
          this.clave  = data[i].id_usuario;
         
        }
      }    
      
    });    */ 
 
  }

  copiar() {
    const textoACopiar = this.clave;
  
    // Crear un elemento de texto oculto
    const elementoOculto = document.createElement("textarea");
    elementoOculto.value = textoACopiar;
    document.body.appendChild(elementoOculto);
  
    // Seleccionar y copiar el texto
    elementoOculto.select();
    document.execCommand("copy");
  
    // Eliminar el elemento de texto oculto
    document.body.removeChild(elementoOculto);
  }
  

}
