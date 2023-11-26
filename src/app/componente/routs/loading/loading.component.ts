import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailStorage } from 'src/app/interfaces/email';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  parametro: string='';
  usuarios: any[] = [];
  constructor(private route: ActivatedRoute, private usuariosApi:UsuariosService) {}

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

      this.usuariosApi.getEmails().subscribe((data: any) => {
        this.usuarios = data;
        let registred = false;
        for (let i = 0; i < this.usuarios.length; i++) {
          if(this.usuarios[i].email == email){
            registred = true;
          }
        }

        if(registred==true){
          console.log("usuario registrado")
            document.location.href = "/user" 
        }else{
          this.crearUsuario(email)          
        }

        
      });
    }
  }

 async crearUsuario(email:string): Promise<void> {
    const data = {
      email: email,
      clave: ""    
    };

    this.usuariosApi.postUser(data).subscribe(
      (response) => {
        console.log('Usuario creado con éxito', response);
        document.location.href = "/user" 
      },
      (error) => {
        console.error('Error al crear usuario', error);
      }
    );
  }

}
