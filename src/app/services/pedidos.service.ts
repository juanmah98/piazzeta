import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { EmailStorage } from '../interfaces/email';
import { Pedidos } from '../interfaces/pedido';
import { Save } from '../interfaces/save';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private firestore: Firestore) { }

  addPedido(pedido: Pedidos,email:EmailStorage){
    const pedidoRef = collection(this.firestore, `user/${email.id}/pedidos`);
    return addDoc(pedidoRef, pedido);
  }

  getPedidos(id: string): Observable<Pedidos[]>{
    const pedidoRef = collection(this.firestore, `user/${id}/pedidos`);
    return collectionData(pedidoRef, {idField: 'id'})  as Observable<Pedidos[]>;
  }

  deletePedido(pedido: Pedidos, id: string){
    const pedidoDocRef = doc(this.firestore,`user/${id}/pedidos/${pedido.id}`);
    return deleteDoc(pedidoDocRef);
  }

  addPedidoListo(pedido: Pedidos, email:EmailStorage){
    const pedidoRef = collection(this.firestore, `user/${email.id}/pedidosListos`);
    return addDoc(pedidoRef, pedido);
  }

  getPedidosListo(id:string): Observable<Pedidos[]>{
    const pedidoRef = collection(this.firestore, `user/${id}/pedidosListos`);
    return collectionData(pedidoRef, {idField: 'id'})  as Observable<Pedidos[]>;
  }

  deletePedidoListo(pedido: Pedidos, id:string){
    const pedidoDocRef = doc(this.firestore,`user/${id}/pedidosListos/${pedido.id}`);
    return deleteDoc(pedidoDocRef);
  }

  editPedido(pedido: Pedidos, id:string) {
    console.log("id Service: "+pedido.id)
    const pokemonDocumentReference = doc(
      this.firestore,
      `user/${id}/pedidos/${pedido.id}`      
    );
    return updateDoc(pokemonDocumentReference, { ...pedido });
  }

  editPedidoListo(pedido: Pedidos, id:string) {
    console.log("id Service: "+pedido.id)
    const pokemonDocumentReference = doc(
      this.firestore,
      `user/${id}/pedidosListos/${pedido.id}`      
    );
    return updateDoc(pokemonDocumentReference, { ...pedido });
  }

  addTotalDia(pedido: Save, id:string){
    const pedidoRef = collection(this.firestore,`user/${id}/${pedido.day.replace(/\//g, "")}`);
    return addDoc(pedidoRef, pedido);
  }

  getTotalDia(pedido: String, id:string): Observable<Save[]>{
    console.log(pedido)
    console.log("pedido")
    
    const pedidoRef = collection(this.firestore, `user/${id}/${pedido}`);
    return collectionData(pedidoRef, {idField: 'id'})  as Observable<Save[]>;
  }
}
