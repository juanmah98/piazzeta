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
  change:boolean=true;
  
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

  usuarios: any[] = [];
  constructor(private formBuilder: FormBuilder, private usuariosApi:UsuariosService) {

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
   
    this.usuariosApi.getUsers().subscribe((data: any) => {
      this.usuarios = data;
      let registred = false;
      for (let i = 0; i < this.usuarios.length; i++) {
        if(data[i].email == email){
          this.clave = data[i].clave          
          if(data[i].clave=='')
          {
            this.change=false;
          }
        }
      }    
      
    });    
 
  }

 /*  async onSumbit():Promise<void> {
        const data = {
          email: this.email,
          clave: this.registerForm.value.claves
        };
        this.usuariosApi.postUser(data).subscribe(
          (response) => {
            console.log('Usuario creado con éxito', response);
            this.registerForm.reset();
          this.ngOnInit();
          },
          (error) => {
            console.error('Error al crear usuario', error);
          }
        );    
  
  } */

  async onChange(){
    this.users.clave = this.registerForm.value.claves;
  
      const someValue = this.email;
      const otherValue = this.registerForm.value.claves;
  
      this.usuariosApi.updateUser(someValue, otherValue).subscribe(
        (response) => {
          console.log('Usuario actualizado exitosamente', response);
          this.registerForm.reset();
          this.ngOnInit();
          // Realiza acciones adicionales si es necesario
        },
        (error) => {
          console.error('Error al actualizar usuario', error);
          // Maneja el error de acuerdo a tus necesidades
        }
      );
    
     
     
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
