import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailStorage } from 'src/app/interfaces/email';
import { User } from 'src/app/interfaces/user';
import { InternoService } from 'src/app/services/interno.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  parametro: string='';
  usuario: boolean = false;
  usuarios: any[] = [];
  registerForm: any;
  email:string='';

  existingUUID = "de95138b-a378-42fb-b08d-11db62780680";


  user: User = {
   
    id_usuario: "",
    email: "",
    clave: ""        
  
}

  constructor(private route: ActivatedRoute, private usuariosApi:UsuariosService, private formBuilder: FormBuilder, private router: Router, private _InternoService: InternoService) {

    this.registerForm = this.formBuilder.group(
      {        
        clave: [""],
        aceptoTerminos: [false, Validators.requiredTrue],
      },
      
    )

  }

  ngOnInit(): void {
    let email = sessionStorage.getItem("email") as string;
    // Suscribirse a los cambios en los parámetros de la ruta
    this.route.params.subscribe(params => {
      // Obtener el valor del parámetro 'parametro'
      this.parametro = params['parametro'];
      
      // Realizar acciones con el valor recibido
      console.log('Valor recibido en UsuarioComponent:', this.parametro);
    });

    if(this.parametro == 'email'){

      this.usuariosApi.getUsers().subscribe((data: any) => {
        this.usuarios = data;
        let registred = false;
        for (let i = 0; i < data.length; i++) {
          if(data[i].email == email){
            registred = true;
            this.user.id_usuario=data[i].id_usuario;
            this.user.email=data[i].email;
            this.user.clave=data[i].clave;
            sessionStorage.setItem("login", '1');
            this._InternoService.setControl('1');
            this._InternoService.setUser(this.user);
            this.router.navigate(['/principal']);
          }
        }

        if(registred==false){
          this.usuario=true;
             this.email=email; 
        }/* else{         
              this.usuario=true;
             this.email=email; 
        } */

        
      });
    
        
      }else if(this.parametro=='clave'){
        this.router.navigate(['/principal']);
      }
  }

 async crearUsuario(): Promise<void> {
    const data = {
      email: this.email,
      clave: this.registerForm.value.clave    
    };
    this.usuariosApi.postUser(data).subscribe(
      (response) => {
        console.log('Usuario creado con éxito', response);
        /* this.router.navigate(['/user']); */
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al crear usuario', error);
      }
    );
  }  

}
