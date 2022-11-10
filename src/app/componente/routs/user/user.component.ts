import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Clave } from 'src/app/interfaces/claves';
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
    /* this.objetounico = this.decodificarJwt(token); */
        
    this.email = email;
    this.name = name;
    this.picture = picture;

    this.userServices.getId(email).subscribe(claves => {
            
      this.response =  claves;    
      console.log(this.response)
      
     /*  claves.forEach(element =>
         this.clave = element.clave);

         for (var index in claves) {
          console.log(index); 
        
          console.log(arr[index]); // prints elements: 10, 20, 30, 40
        }  */ 
         if(claves.length!=0)
      {
        this.change=true;
        this.clave = claves[0].clave;
       
      }
    });    
   
  }

  async onSumbit(){
    this.users.clave = this.registerForm.value.claves;
    this.users.email= this.email;
    /* if(this.response.length==0)
    this.users.id = this.response[0].id; */
   /* var response = await this.userServices.getId(this.email).subscribe(claves => {
      console.log(claves);      
    }) */
    
    
        
     
     
      console.log(this.users.id)
      console.log("saliendo del get");
      
      
      await this.userServices.addId(this.users);
        console.log("Se agrego nueva clave");
       
      
         
    
    
  }

  async onChange(){
    this.users.clave = this.registerForm.value.claves;
    this.users.email= this.email;  
    this.users.id = this.response[0].id;
   
     
      await  this.userServices.editId(this.users);
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
