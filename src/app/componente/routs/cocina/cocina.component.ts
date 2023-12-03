import { Component, OnInit } from '@angular/core';
import { Comandas } from 'src/app/interfaces/comandas';
import { EmailStorage } from 'src/app/interfaces/email';
import { Pedidos } from 'src/app/interfaces/pedido';
import { User } from 'src/app/interfaces/user';
import { ComandasService } from 'src/app/services/comandas.service';
import { InternoService } from 'src/app/services/interno.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css']
})
export class CocinaComponent implements OnInit {

  constructor(private _InternoService:InternoService, private _ComandaService:ComandasService) { }


  comanda: Comandas[] = [/* {   
    id_comanda: "",
    contenido: "",
    mesa: "" ,
    estado:false
  } */]



  id:string ="";
  email:string="";
  ngOnInit(): void {

/* 
    this._ComandaService.getComanda().subscribe((data: Comandas[]) => {
      let i=0;
      
      data.forEach((element: Comandas) => {
        if(element.estado==false){
          this.comanda[i++] = element;
        }
      });
      
    }); */

    this._ComandaService.getComanda().subscribe((data: Comandas[]) => {
      // Filtra y agrupa las comandas según el estado
      const comandasAgrupadas = this.filtrarPorEstado(data, false);
  
      // Puedes hacer lo que necesites con las comandas agrupadas
      console.log('Comandas con estado false:', comandasAgrupadas[1]);
  
      // Asigna el resultado a this.comanda si es necesario
      this.comanda = comandasAgrupadas[1];
    });

  }

  filtrarPorEstado(arr: Comandas[], estadoAFiltrar: boolean): Comandas[][] {
    const filtradas = arr.filter(comanda => comanda.estado === estadoAFiltrar);
    const agrupadas: Comandas[][] = [[], []];
  
    filtradas.forEach(comanda => {
      if (comanda.estado === true) {
        agrupadas[0].push(comanda);
      } else {
        agrupadas[1].push(comanda);
      }
    });
  
    return agrupadas;
  }

 async onClickDelete(pedido:Comandas){ 

  
  const com: Comandas[] = this.comanda.map(element => {
    if (element === pedido) {
      // Si 'pedido' es igual a 'element', actualiza su estado
      return { ...element, estado: true };
    } else {
      return element;
    }
  });
  
  // Filtra solo los elementos con estado igual a false
  this.comanda = com.filter(element => element.estado === false);


   const someValue = pedido.id_comanda;
      const otherValue = true;
  
      this._ComandaService.updateComanda(someValue, otherValue).subscribe(
        (response) => {
          console.log('Usuario actualizado exitosamente', response);          
         /*  this.ngOnInit(); */
          // Realiza acciones adicionales si es necesario
        },
        (error) => {
          console.error('Error al actualizar usuario', error);
          // Maneja el error de acuerdo a tus necesidades
        }
      );
      this.ngOnInit();
}  

}

